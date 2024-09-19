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
import { cn, getCitiesByCountry } from "@/lib/utils";
import { CardContent } from "../ui/card";
import {
  experienceSchema,
  experienceSchemaType,
} from "@/models/validationSchemas";
import { COUNTRIES, EMPLOYEMENT_TYPES } from "@/constants";
import { useEffect } from "react";
import { CustomFormField } from "../auth";
import { FormFieldType } from "../auth/CustomFormField";
import { Form } from "../ui/form";
import { authThunks } from "@/lib/features/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { format } from "date-fns";

const AddExperienceDialog = () => {
  const { user, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const form = useForm<experienceSchemaType>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      currently_working : false,
    }
  });

  const { control, handleSubmit, setValue, watch } = form;

  const currentlyWorking = watch("currently_working");

  useEffect(() => {
    if (currentlyWorking) {
      setValue("end_date", "Present");
    } else {
      setValue("end_date", format(new Date(), "yyyy-MM-dd"));
    }
  }, [setValue, currentlyWorking]);

  const onSubmit = async (data: experienceSchemaType) => {
    await dispatch(
      authThunks.updateProfile({
        userId: user?.userId || "",
        updateData: { experiences: { value: [data], replace: false } },
      })
    );
  };

  return (
    <Dialog>
      <DialogTrigger className={cn("", buttonVariants({ variant: "default" }))}>
        Add New Experience
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] border max-w-3xl md:w-full sm:w-[500px] w-[300px] rounded-xl overflow-y-auto">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add New Experience</DialogTitle>
              <DialogDescription>Enter details below</DialogDescription>

              <CardContent className="px-0 text-start space-y-4 w-full">
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* title */}
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={control}
                    name="title"
                    label="Title"
                    placeholder="Enter Job Title"
                  />

                  {/* hospital_name */}
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={control}
                    name="hospital_name"
                    label="Hospital Name"
                    placeholder="Enter Hospital Name"
                  />
                </div>

                {/* description */}
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={control}
                  name="description"
                  label="Description"
                  placeholder="Tell us about your experience"
                />

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* start_date */}
                  <CustomFormField
                    fieldType={FormFieldType.DATE_PICKER}
                    control={control}
                    name="start_date"
                    label="Start Date"
                  />

                  {/* end_date */}
                  {!currentlyWorking ? (
                    <CustomFormField
                      fieldType={FormFieldType.DATE_PICKER}
                      control={control}
                      name="end_date"
                      label="To"
                      placeholder={"Select end date"}
                    />
                  ) : (
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={control}
                      name="end_date"
                      label="To"
                      disabled
                      placeholder={"Present"}
                    />
                  )}
                </div>

                <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6">
                  {/* country */}
                  <CustomFormField
                    fieldType={FormFieldType.SELECT_WITH_SEARCH}
                    control={control}
                    items={COUNTRIES}
                    name="country"
                    label="Country"
                    enableCreation={false}
                  />

                  {/* city */}
                  <CustomFormField
                    fieldType={FormFieldType.SELECT_WITH_SEARCH}
                    control={control}
                    items={getCitiesByCountry(watch("country")).map((c) => ({
                      label: `${c.name} - ${c.admin1}`,
                      value: c.id,
                    }))}
                    name="city"
                    label="City"
                    enableCreation={false}
                  />

                  {/* employment_type */}
                  <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={control}
                    items={EMPLOYEMENT_TYPES}
                    name="employment_type"
                    label="Employment Type"
                    placeholder="Select"
                    enableCreation={false}
                  />
                </div>

                {/* currently_working */}
                <CustomFormField
                  fieldType={FormFieldType.CHECKBOX}
                  control={control}
                  name="currently_working"
                  label="I currently work here"
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
                Add Experience
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddExperienceDialog;
