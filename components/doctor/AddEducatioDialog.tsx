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
import {
  educationSchema,
  educationSchemaType,
} from "@/models/validationSchemas";
import { DEGREES, FIELDS, GRADES, INSTITUTES } from "@/constants";
import { useEffect } from "react";
import { CustomFormField } from "../auth";
import { FormFieldType } from "../auth/CustomFormField";
import { Form } from "../ui/form";
import { authThunks } from "@/lib/features/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { format } from "date-fns";

const AddEducationDialog = () => {
  const { user, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const form = useForm<educationSchemaType>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      degree_name: DEGREES[0].value,
      field: FIELDS[0].value,
      description: "",
      institute: INSTITUTES[0].value,
      start_date: format(new Date(), "yyyy-MM-dd"),
      end_date: format(new Date(), "yyyy-MM-dd"),
      currently_studying: false,
      grade: GRADES[0].value,
    },
  });

  const onSubmit = async (data: educationSchemaType) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    await dispatch(
      authThunks.updateProfile({
        userId: user?.userId || "",
        updateData: { education: { value: [data], replace: false } },
      })
    );
  };

  const { control, handleSubmit, setValue, watch } = form;

  const currentlyStudying = watch("currently_studying");

  useEffect(() => {
    if (currentlyStudying) {
      setValue("end_date", "Present");
      setValue("grade", "NO GRADE");
    } else {
      setValue("end_date", format(new Date(), "yyyy-MM-dd"));
      setValue("grade", GRADES[0].value);
    }
  }, [setValue, currentlyStudying]);

  return (
    <Dialog>
      <DialogTrigger className={cn("", buttonVariants({ variant: "default" }))}>
        Add New Education
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] border max-w-3xl md:w-full sm:w-[500px] w-[300px] rounded-xl overflow-y-auto">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add New Education</DialogTitle>
              <DialogDescription>Enter details below</DialogDescription>

              <CardContent className="px-0 text-start space-y-4 w-full">
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6">
                  {/* institute */}
                  <CustomFormField
                    fieldType={FormFieldType.SELECT_WITH_SEARCH}
                    control={control}
                    items={INSTITUTES}
                    name={`institute`}
                    label="Institute"
                    placeholder={"Select institute..."}
                  />

                  {/* degree_name */}
                  <CustomFormField
                    fieldType={FormFieldType.SELECT_WITH_SEARCH}
                    control={control}
                    items={DEGREES}
                    name={`degree_name`}
                    label="Select degree..."
                    placeholder="Degree"
                  />

                  {/* field */}
                  <CustomFormField
                    fieldType={FormFieldType.SELECT_WITH_SEARCH}
                    control={control}
                    items={FIELDS}
                    name={`field`}
                    label="Field of study"
                    placeholder="Select Field..."
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

                <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6">
                  {/* start_date */}
                  <CustomFormField
                    fieldType={FormFieldType.DATE_PICKER}
                    control={control}
                    name="start_date"
                    label="Start Date"
                  />

                  {/* end_date */}
                  {!currentlyStudying ? (
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

                  {/* grade */}
                  {!currentlyStudying ? (
                    <CustomFormField
                      fieldType={FormFieldType.SELECT_WITH_SEARCH}
                      control={control}
                      items={GRADES}
                      name={`grade`}
                      label="Grade"
                      placeholder="Select grade..."
                    />
                  ) : (
                    <CustomFormField
                      fieldType={FormFieldType.INPUT}
                      control={control}
                      name={`grade`}
                      label="To"
                      disabled
                      placeholder="NO GRADE"
                    />
                  )}
                </div>

                {/* currently_studying */}
                <CustomFormField
                  fieldType={FormFieldType.CHECKBOX}
                  control={control}
                  name="currently_studying"
                  label="I am currently studying"
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
                Add Education
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEducationDialog;
