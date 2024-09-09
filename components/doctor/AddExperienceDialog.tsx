"use client";

import { useForm, Controller, useWatch } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CardContent } from "../ui/card";
import { experienceSchema } from "@/models/validationSchemas";
import { CITIES, COUNTRIES } from "@/constants";
import { useEffect } from "react";
import { CustomFormField } from "../auth";
import { FormFieldType } from "../auth/CustomFormField";
import { Form } from "../ui/form";

const AddExperienceDialog = () => {
  const form = useForm({
    resolver: zodResolver(experienceSchema),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const currentlyWorking = useWatch({
    control,
    name: "currently_working",
    defaultValue: false,
  });

  const onSubmit = (data: any) => {
    if (currentlyWorking) {
      setValue("time_period.to", new Date());
    }
    console.log("🚀 ~ onSubmit ~ data:", data);
  };

  useEffect(() => {
    if (currentlyWorking) {
      setValue("time_period.to", new Date());
    }
  }, [currentlyWorking, setValue]);

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
                  {/* time_period.from */}
                  <CustomFormField
                    fieldType={FormFieldType.DATE_PICKER}
                    control={control}
                    name="time_period.from"
                    label="From"
                  />

                  {/* time_period.to */}
                  <CustomFormField
                    fieldType={FormFieldType.DATE_PICKER}
                    control={control}
                    name="time_period.to"
                    label="To"
                  />
                </div>

                <div className="grid lg:grid-cols-3 sm:grid-cols-2  gap-6">
                  {/* city */}
                  <CustomFormField
                    fieldType={FormFieldType.SELECT_WITH_SEARCH}
                    control={control}
                    items={CITIES}
                    name="city"
                    label="City"
                  />

                  {/* country */}
                  <CustomFormField
                    fieldType={FormFieldType.SELECT_WITH_SEARCH}
                    control={control}
                    items={COUNTRIES}
                    name="country"
                    label="Country"
                  />

                  {/* employement_type */}
                  <CustomFormField
                    fieldType={FormFieldType.SELECT_WITH_SEARCH}
                    control={control}
                    name="employement_type"
                    label="Employment Type"
                    placeholder="Select"
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
              <Button type="submit">Add Experience</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddExperienceDialog;
