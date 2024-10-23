import { useAppSelector } from "@/lib/hooks";
import { TabsContent } from "@/components/ui/tabs";
import { Loader } from "@/components/common/Loader";
import { cn } from "@/lib/utils";
import { ControllerRenderProps } from "react-hook-form";
import { CircleCheckBigIcon } from "lucide-react";
import { formatInTimeZone } from "date-fns-tz";

interface TabListContentProps {
  day: string;
  dayIndex: number;
  field: ControllerRenderProps<any, string>;
}

const AvailableTimingsTabsContent = ({
  day,
  dayIndex,
  field,
}: TabListContentProps) => {
  const { loading } = useAppSelector((state) => state.auth);
  const { value, onChange } = field;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const handleTimeSlotChange = (
    start_time: string,
    end_time: string,
    reserved: boolean
  ) => {
    if (reserved) return;

    onChange({
      start_time,
      end_time,
      day,
    });
  };

  const { fetchedDoctor, loading: doctorLoader } = useAppSelector(
    (state) => state.doctor
  );

  if (loading || doctorLoader) return <Loader />;

  if (!fetchedDoctor || !fetchedDoctor.availableDays) return null;

  const { availableDays } = fetchedDoctor;

  return (
    <TabsContent value={day} key={dayIndex} className="min-h-96">
      {availableDays[dayIndex]?.slots?.length > 0 ? (
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2 max-h-96 overflow-y-auto">
          {availableDays[dayIndex]?.slots?.map(
            ({ start_time, end_time, reserved = false }, slotIndex) => {
              // Combine current date with the start and end times to form a valid datetime string
              const currentDate = formatInTimeZone(
                new Date(),
                timezone,
                "yyyy-MM-dd"
              );

              const startDateTimeString = `${currentDate}T${start_time}:00`;
              const endDateTimeString = `${currentDate}T${end_time}:00`;

              // Convert times to the user's timezone
              const formattedStartTime = formatInTimeZone(
                new Date(startDateTimeString),
                timezone,
                "hh:mm aa"
              );
              const formattedEndTime = formatInTimeZone(
                new Date(endDateTimeString),
                timezone,
                "hh:mm aa"
              );

              return (
                <div
                  className={cn(
                    "border rounded-md p-2 flex items-center justify-center shadow cursor-pointer",
                    {
                      "cursor-not-allowed bg-gray-100": reserved,
                    }
                  )}
                  onClick={() =>
                    handleTimeSlotChange(start_time, end_time, reserved)
                  }
                  key={slotIndex}
                  aria-disabled={reserved}
                >
                  <div className="flex items-center gap-2 min-w-40 max-w-[320px]">
                    <p className="text-sm whitespace-nowrap">
                      {`${formattedStartTime} - ${formattedEndTime}`}
                    </p>

                    {value &&
                      value.day === day &&
                      value.start_time ===
                        availableDays[dayIndex]?.slots[slotIndex]?.start_time &&
                      value.end_time ===
                        availableDays[dayIndex]?.slots[slotIndex]?.end_time && (
                        <CircleCheckBigIcon className="text-primary w-4 h-4" />
                      )}
                  </div>
                </div>
              );
            }
          )}
        </div>
      ) : (
        <div className="min-h-96 text-gray-500 flex items-center justify-center w-full h-full">
          No slots available for this day.
        </div>
      )}
    </TabsContent>
  );
};

export default AvailableTimingsTabsContent;
