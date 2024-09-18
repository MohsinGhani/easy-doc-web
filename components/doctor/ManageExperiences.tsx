import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { z } from "zod";
import { authThunks } from "@/lib/features/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  experienceSchema,
  experienceSchemaType,
} from "@/models/validationSchemas";
import { getCitiesByCountry } from "@/lib/utils";
import { Loader } from "../Loader";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../auth/CustomFormField";
import AddExperienceDialog from "./AddExperienceDialog";
import DeleteDialog from "../DeleteDialog";
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
import { Trash2 } from "lucide-react";
import { COUNTRIES, EMPLOYEMENT_TYPES } from "@/constants";
import { Button } from "../ui/button";

const ManageExperiences = () => {
  const { user, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const schema = z.object({
    experiences: z.array(experienceSchema),
  });
  const form = useForm<{ experiences: experienceSchemaType[] }>({
    resolver: zodResolver(schema),
    defaultValues: {
      experiences: user?.experiences || [],
    },
  });
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isDirty },
  } = form;
  const { fields, replace } = useFieldArray({
    control,
    name: "experiences",
  });

  useEffect(() => {
    if (user?.experiences) {
      replace(user.experiences);
    }
  }, [user?.experiences, replace]);

  useEffect(() => {
    const subscriptions: Array<() => void> = fields.map((_, index) => {
      return watch((value, { name }) => {
        if (name === `experiences.${index}.currently_working`) {
          const currentlyWorking =
            value?.experiences?.[index]?.currently_working;
          if (currentlyWorking) {
            setValue(`experiences.${index}.end_date`, "Present");
          }
        }
      }) as unknown as () => void;
    });

    return () => {
      subscriptions.forEach((unsubscribe) => {
        if (typeof unsubscribe === "function") {
          unsubscribe();
        }
      });
    };
  }, [fields, watch, setValue, user]);

  const onSubmit = async (data: { experiences: experienceSchemaType[] }) => {
    await dispatch(
      authThunks.updateProfile({
        userId: user?.userId || "",
        updateData: {
          experiences: {
            value: data.experiences,
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
            Practice Experience
          </CardTitle>
          <AddExperienceDialog />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {fields.length > 0 ? (
              <Accordion type="multiple">
                {fields.map((field, index) => {
                  const currentlyWorking = watch(
                    `experiences.${index}.currently_working`
                  );
                  const country = watch(`experiences.${index}.country`);
                  console.log("country", country);

                  return (
                    <AccordionItem
                      value={`item-${index}`}
                      key={field.id}
                      className="mb-6"
                    >
                      <AccordionTrigger
                        className="hover:no-underline p-4 data-[state=open]:bg-secondary rounded-xl border bg-card text-card-foreground shadow mb-6"
                        DeleteIcon={
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
                                    experiences: {
                                      value: user?.experiences?.filter(
                                        (_, i) => i !== index
                                      ),
                                      replace: true,
                                    },
                                  },
                                })
                              );
                            }}
                          />
                        }
                      >
                        <div className="flex flex-col items-start w-full">
                          <h3 className="font-semibold">
                            {field.hospital_name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {field.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {format(field.start_date, "yyyy")} -{" "}
                            {field.end_date === "Present"
                              ? field.end_date
                              : format(field.end_date, "yyyy")}
                          </p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 p-6 rounded-xl bg-secondary/25">
                          <div className="grid sm:grid-cols-2 gap-6">
                            {/* title */}
                            <CustomFormField
                              fieldType={FormFieldType.INPUT}
                              control={control}
                              name={`experiences.${index}.title`}
                              label="Title"
                              placeholder="Enter Job Title"
                            />

                            {/* hospital_name */}
                            <CustomFormField
                              fieldType={FormFieldType.INPUT}
                              control={control}
                              name={`experiences.${index}.hospital_name`}
                              label="Hospital Name"
                              placeholder="Enter Hospital Name"
                            />
                          </div>
                          {/* description */}
                          <CustomFormField
                            fieldType={FormFieldType.TEXTAREA}
                            control={control}
                            name={`experiences.${index}.description`}
                            label="Description"
                            placeholder="Tell us about your experience"
                          />
                          <div className="grid sm:grid-cols-2 gap-6">
                            {/* start_date */}
                            <CustomFormField
                              fieldType={FormFieldType.DATE_PICKER}
                              control={control}
                              name={`experiences.${index}.start_date`}
                              label="Start Date"
                            />

                            {/* end_date */}
                            {!currentlyWorking ? (
                              <CustomFormField
                                fieldType={FormFieldType.DATE_PICKER}
                                control={control}
                                name={`experiences.${index}.end_date`}
                                label="To"
                                placeholder="Select end date"
                              />
                            ) : (
                              <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={control}
                                name={`experiences.${index}.end_date`}
                                label="To"
                                defaultValue="Present"
                                disabled
                                placeholder="Present"
                              />
                            )}
                          </div>
                          <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6">
                            {/* country */}
                            <CustomFormField
                              fieldType={FormFieldType.SELECT_WITH_SEARCH}
                              control={control}
                              items={COUNTRIES.map((c) => ({
                                label: `${c.flag} ${c.name}`,
                                value: c.code,
                              }))}
                              name={`experiences.${index}.country`}
                              label="Country"
                              enableCreation={false}
                              placeholder="Select"
                            />

                            {/* city */}
                            <CustomFormField
                              fieldType={FormFieldType.SELECT_WITH_SEARCH}
                              enableCreation={false}
                              control={control}
                              items={getCitiesByCountry(country).map((c) => ({
                                label: `${c.name} - ${c.admin1}`,
                                value: c.id,
                              }))}
                              name={`experiences.${index}.city`}
                              label="City"
                              placeholder="Select"
                            />

                            {/* employment_type */}
                            <CustomFormField
                              fieldType={FormFieldType.SELECT}
                              control={control}
                              items={EMPLOYEMENT_TYPES}
                              name={`experiences.${index}.employment_type`}
                              label="Employment Type"
                              placeholder="Select"
                            />
                          </div>
                          {/* currently_working */}

                          <CustomFormField
                            fieldType={FormFieldType.CHECKBOX}
                            control={control}
                            name={`experiences.${index}.currently_working`}
                            label="I currently work here"
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            ) : (
              <>No Experiences found, add one now!</>
            )}
            {/* Save button */}
            <CardFooter className="flex justify-end space-x-2">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!isDirty || loading}
                className="bg-blue-500 text-white"
              >
                Save Changes
              </Button>
            </CardFooter>{" "}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ManageExperiences;
