"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CardContent } from "../ui/card";
import { awardSchema, awardSchemaType } from "@/models/validationSchemas";
import { institutes } from "@/constants";
import { CustomFormField } from "../auth";
import { FormFieldType } from "../auth/CustomFormField";
import { Form } from "../ui/form";
import { authThunks } from "@/lib/features/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { format } from "date-fns";

const AddAwardDialog = () => {
  const { user, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const form = useForm<awardSchemaType>({
    resolver: zodResolver(awardSchema),
    defaultValues: {
      institute: institutes[0].value,
      description: "",
      award_name: "",
      year: format(new Date(), "yyyy"),
    },
  });

  const onSubmit = async (data: awardSchemaType) => {
    await dispatch(
      authThunks.updateProfile({
        userId: user?.userId || "",
        updateData: { awards: { value: [data], replace: false } },
      })
    );
  };

  const { control, handleSubmit } = form;

  return (
    <Dialog>
      <DialogTrigger className={cn("", buttonVariants({ variant: "default" }))}>
        Add New Award
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] border max-w-3xl md:w-full sm:w-[500px] w-[300px] rounded-xl overflow-y-auto">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add New Award</DialogTitle>
              <DialogDescription>Enter details below</DialogDescription>

              <CardContent className="p-0 space-y-6 w-full">
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6">
                  {/* award_name */}
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={control}
                    name="award_name"
                    label="Award name"
                    placeholder="Enter award name"
                  />

                  {/* institute */}
                  <CustomFormField
                    fieldType={FormFieldType.SELECT_WITH_SEARCH}
                    control={control}
                    items={institutes}
                    name={`institute`}
                    label="Institute"
                    placeholder={"Select institute..."}
                  />

                  {/* year */}
                  <CustomFormField
                    fieldType={FormFieldType.YEAR_PICKER}
                    control={control}
                    name={`year`}
                    label="Year"
                    placeholder="Pick a year"
                  />
                </div>

                {/* description */}
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={control}
                  name={`description`}
                  label="Description"
                  placeholder="Tell us about your experience"
                />
              </CardContent>
            </DialogHeader>

            <DialogFooter>
              <DialogClose
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Cancel
              </DialogClose>
              <Button type="submit" disabled={loading}>
                Add Award
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAwardDialog;
