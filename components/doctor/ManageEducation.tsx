"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AddEducationDialog from "./AddEducatioDialog";
import { Trash2 } from "lucide-react";
import DeleteDialog from "../DeleteDialog";
import {
  degrees,
  fields as FIELDS_OF_STUDIES,
  GRADES,
  institutes,
} from "@/constants";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  educationSchema,
  educationSchemaType,
} from "@/models/validationSchemas";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { authThunks } from "@/lib/features/auth/authThunks";
import { Loader } from "../Loader";
import { Form } from "../ui/form";
import { CustomFormField } from "../auth";
import { FormFieldType } from "../auth/CustomFormField";

export default function ManageEducation() {
  const { user, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const schema = z.object({
    education: z.array(educationSchema),
  });

  const form = useForm<{ education: educationSchemaType[] }>({
    resolver: zodResolver(schema),
    defaultValues: {
      education: user?.education || [],
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { isDirty },
  } = form;

  const { fields, replace } = useFieldArray({
    control,
    name: "education",
  });

  useEffect(() => {
    if (user?.education) {
      replace(
        user?.education.map((edu) => ({
          ...edu,
          start_date: format(new Date(edu.start_date), "yyyy-MM-dd"),
          end_date:
            edu.end_date === "Present"
              ? "Present"
              : format(new Date(edu.end_date), "yyyy-MM-dd"),
        }))
      );
    }
  }, [user?.education, replace]);

  const onSubmit = async (data: { education: educationSchemaType[] }) => {
    await dispatch(
      authThunks.updateProfile({
        userId: user?.userId || "",
        updateData: {
          education: {
            value: data.education,
            replace: true,
          },
        },
      })
    );
  };

  if (loading) return <Loader />;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex sm:flex-row flex-col gap-4 justify-between items-center">
          <CardTitle className="text-2xl sm:text-md">
            Educational Details
          </CardTitle>
          <AddEducationDialog />
        </div>
      </CardHeader>

      <CardContent>
        {/* Only one form wrapping all education(s) */}
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {fields.length > 0 ? (
              <Accordion type="multiple">
                {fields.map((field, index) => {
                  const currentlyStudying = watch(
                    `education.${index}.currently_studying`
                  );

                  return (
                    <AccordionItem
                      value={`item-${index}`}
                      key={field.id}
                      className="mb-6 "
                    >
                      <AccordionTrigger
                        className="hover:no-underline p-4 data-[state=open]:bg-secondary rounded-xl border bg-card text-card-foreground shadow mb-6"
                        DeleteIcon={
                          <>
                            <DeleteDialog
                              trigger={
                                <Trash2 className="h-4 w-4 shrink-0 text-destructive" />
                              }
                              text="Your education will be deleted"
                              onReject={async () => {
                                await dispatch(
                                  authThunks.updateProfile({
                                    userId: user?.userId || "",
                                    updateData: {
                                      education: {
                                        value: user?.education?.filter(
                                          (_, i) => i !== index
                                        ),
                                        replace: true,
                                      },
                                    },
                                  })
                                );
                              }}
                            />
                          </>
                        }
                      >
                        <div className="flex flex-col items-start w-full capitalize">
                          <h3 className="font-semibold">{field.institute}</h3>
                          <p className="text-sm text-muted-foreground">
                            {field.degree_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {field.start_date} - {field.end_date}
                          </p>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent>
                        <div className="space-y-4 p-6 rounded-xl bg-secondary/25">
                          <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6">
                            {/* institute */}
                            <CustomFormField
                              fieldType={FormFieldType.SELECT_WITH_SEARCH}
                              control={control}
                              items={institutes}
                              name={`education.${index}.institute`}
                              label="Institute"
                              placeholder={"Select institute..."}
                            />

                            {/* degree_name */}
                            <CustomFormField
                              fieldType={FormFieldType.SELECT_WITH_SEARCH}
                              control={control}
                              items={degrees}
                              name={`education.${index}.degree_name`}
                              label="Select institute..."
                              placeholder="Degree"
                            />

                            {/* field */}
                            <CustomFormField
                              fieldType={FormFieldType.SELECT_WITH_SEARCH}
                              control={control}
                              items={FIELDS_OF_STUDIES}
                              name={`education.${index}.field`}
                              label="Field of study"
                              placeholder="Select Field..."
                            />
                          </div>

                          {/* description */}
                          <CustomFormField
                            fieldType={FormFieldType.TEXTAREA}
                            control={control}
                            name={`education.${index}.description`}
                            label="Description"
                            placeholder="Tell us about your experience"
                          />

                          <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6">
                            {/* start_date */}
                            <CustomFormField
                              fieldType={FormFieldType.DATE_PICKER}
                              control={control}
                              name={`education.${index}.start_date`}
                              label="From"
                            />

                            {/* end_date */}
                            {!currentlyStudying ? (
                              <CustomFormField
                                fieldType={FormFieldType.DATE_PICKER}
                                control={control}
                                name={`education.${index}.end_date`}
                                label="To"
                                placeholder="Select end date"
                              />
                            ) : (
                              <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={control}
                                name={`education.${index}.end_date`}
                                label="To"
                                disabled
                                placeholder="Present"
                              />
                            )}

                            {/* grade */}
                            {!currentlyStudying ? (
                              <CustomFormField
                                fieldType={FormFieldType.SELECT_WITH_SEARCH}
                                control={control}
                                items={GRADES}
                                name={`education.${index}.grade`}
                                label="Grade"
                                placeholder="Select grade..."
                              />
                            ) : (
                              <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={control}
                                name={`education.${index}.grade`}
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
                            name={`education.${index}.currently_studying`}
                            label="I am currently studying"
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            ) : (
              <>No Educations found, add one now!</>
            )}

            {/* Save button */}
            <CardFooter className="flex justify-end space-x-2">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!isDirty}
                className="bg-blue-500 text-white"
              >
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
