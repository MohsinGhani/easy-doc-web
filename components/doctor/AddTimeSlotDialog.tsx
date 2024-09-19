import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { TimeInput } from "../TimeInput";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { authThunks } from "@/lib/features/auth/authThunks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  availableSlotSchemaType,
  availableSlotSchema,
} from "@/models/validationSchemas";
import { Form, FormControl } from "../ui/form";
import { CustomFormField } from "../auth";
import { FormFieldType } from "../auth/CustomFormField";
import _ from "lodash";
import { differenceInMinutes } from "date-fns";
import {
  calculateTimeSlots,
  formatTimeForUI,
  getOverlappingSlots,
  isOverlapping,
  parseTime,
} from "@/lib/utils";
import { toast } from "sonner";
import DeleteDialog from "../common/DeleteDialog";
import { Trash2 } from "lucide-react";

interface AddTimeSlotDialogProps {
  day: string;
  dayIndex: number;
}

export function AddTimeSlotDialog({ day, dayIndex }: AddTimeSlotDialogProps) {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);

  const [overlappingSlots, setOverlappingSlots] = useState<AvailableSlot[]>([]);
  const [nonOverlappingSlots, setNonOverlappingSlots] = useState<
    AvailableSlot[]
  >([]);

  const form = useForm<availableSlotSchemaType>({
    resolver: zodResolver(availableSlotSchema),
    defaultValues: {
      start_time: "00:00",
      end_time: "00:30",
    },
  });

  const { handleSubmit, control, watch } = form;

  const startTime = watch("start_time");
  const endTime = watch("end_time");

  useEffect(() => {
    if (dayIndex === -1 || !user?.availableDays) return;

    const existingSlots = user?.availableDays[dayIndex]?.slots || [];

    const foundOverlappingSlots = getOverlappingSlots(
      existingSlots,
      startTime,
      endTime
    );
    setOverlappingSlots(foundOverlappingSlots);

    const foundNonOverlappingSlots = calculateTimeSlots(
      startTime,
      endTime,
      existingSlots
    );
    setNonOverlappingSlots(foundNonOverlappingSlots);
  }, [startTime, endTime, user, dayIndex]);

  const timeDiffInMinutes = useMemo(() => {
    const start = parseTime(startTime);
    const end = parseTime(endTime);
    return differenceInMinutes(end, start);
  }, [startTime, endTime]);

  const hours = Math.floor(timeDiffInMinutes / 60);
  const minutes = timeDiffInMinutes % 60;

  const onSubmit = async (data: availableSlotSchemaType) => {
    if (dayIndex === -1) {
      return;
    }

    let updatedData = _.cloneDeep(user?.availableDays);

    const existingSlots = updatedData[dayIndex]?.slots || [];

    if (nonOverlappingSlots.length === 0) {
      toast.error(
        "All the time periods are already covered by existing slots."
      );
      return;
    }

    // Combine existing slots with non-overlapping slots
    updatedData[dayIndex] = {
      day: user?.availableDays[dayIndex]?.day,
      slots: [...existingSlots, ...nonOverlappingSlots],
    };

    // Sort the slots array based on start_time in "HH:mm" format
    updatedData[dayIndex].slots.sort((a, b) => {
      const timeA = parseInt(a.start_time.replace(":", ""), 10);
      const timeB = parseInt(b.start_time.replace(":", ""), 10);
      return timeA - timeB;
    });

    // Dispatch the updated and sorted data
    await dispatch(
      authThunks.updateProfile({
        userId: user?.userId || "",
        updateData: {
          availableDays: {
            value: updatedData,
            replace: true,
          },
        },
      })
    );

    setOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={() => setOpen(true)}
          variant="ghost"
          className="text-sm text-primary hover:text-primary/80"
        >
          + Add a slot
        </Button>

        <DeleteDialog
          onReject={async () => {
            let updatedData = _.cloneDeep(user?.availableDays);
            updatedData[dayIndex] = {
              day: user?.availableDays[dayIndex]?.day,
              slots: [],
            };

            await dispatch(
              authThunks.updateProfile({
                userId: user?.userId || "",
                updateData: {
                  availableDays: {
                    value: updatedData,
                    replace: true,
                  },
                },
              })
            );
          }}
          trigger={
            <Button variant="destructive" disabled={user?.availableDays[dayIndex]?.slots?.length === 0}>
              <Trash2 className="h-4 w-4 shrink-0" />{" "}
              <span>Delete all slots</span>
            </Button>
          }
          text={`Are you sure you want to delete all slots for ${day}?`}
        />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Add availability for {day}</DialogTitle>
                {timeDiffInMinutes > 30 && (
                  <DialogDescription>
                    Dear user, you have selected a duration of{" "}
                    {hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""}` : ""}
                    {minutes > 0
                      ? ` and ${minutes} minute${minutes > 1 ? "s" : ""}`
                      : ""}{" "}
                    (from {formatTimeForUI(startTime)} to{" "}
                    {formatTimeForUI(endTime)}).
                    {overlappingSlots.length > 0 && (
                      <>
                        {" "}
                        There are {overlappingSlots.length} existing slot
                        {overlappingSlots.length > 1 ? "s" : ""} during this
                        time period.
                        {nonOverlappingSlots.length === 0
                          ? " Since all of this time period overlaps with existing availability, no new time slots will be added."
                          : ` We will add ${
                              nonOverlappingSlots.length
                            } new time slot
                        ${
                          nonOverlappingSlots.length > 1 ? "s" : ""
                        } for the remaining non-overlapping time.`}
                      </>
                    )}
                    {overlappingSlots.length === 0 && (
                      <>
                        {" "}
                        This will create {nonOverlappingSlots.length} new time
                        slot
                        {nonOverlappingSlots.length > 1 ? "s" : ""} of 30
                        minutes each.
                      </>
                    )}
                  </DialogDescription>
                )}
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <CustomFormField
                  fieldType={FormFieldType.SKELETON}
                  control={control}
                  name="start_time"
                  label="Start time"
                  renderSkeleton={(field) => (
                    <FormControl>
                      <TimeInput
                        id="start_time"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  )}
                />

                <CustomFormField
                  fieldType={FormFieldType.SKELETON}
                  control={control}
                  name="end_time"
                  label="End time"
                  renderSkeleton={(field) => (
                    <FormControl>
                      <TimeInput
                        id="end_time"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  )}
                />
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type={"submit"} disabled={loading}>
                  Add Slot
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
