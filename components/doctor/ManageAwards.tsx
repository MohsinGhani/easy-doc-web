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
import AddAwardDialog from "./AddAwardDialog";
import { Trash2 } from "lucide-react";
import DeleteDialog from "../common/DeleteDialog";
import { authThunks } from "@/lib/features/auth/authThunks";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { awardSchema, awardSchemaType } from "@/models/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { CustomFormField } from "../auth";
import { FormFieldType } from "../auth/CustomFormField";
import { INSTITUTES } from "@/constants";
import { Loader } from "../common/Loader";

export default function ManageAwards() {
  const { user, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const schema = z.object({
    awards: z.array(awardSchema),
  });

  const form = useForm<{ awards: awardSchemaType[] }>({
    resolver: zodResolver(schema),
    defaultValues: {
      awards: user?.awards || [],
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = form;

  const { fields, replace } = useFieldArray({
    control,
    name: "awards",
  });

  useEffect(() => {
    if (user?.awards) {
      replace(
        user?.awards.map((awd) => ({
          ...awd,
          year: format(new Date(awd.year), "yyyy"),
        }))
      );
    }
  }, [user?.awards, replace]);

  const onSubmit = async (data: { awards: awardSchemaType[] }) => {
    await dispatch(
      authThunks.updateProfile({
        userId: user?.userId,
        updateData: {
          awards: {
            value: data.awards,
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
          <CardTitle className="text-2xl sm:text-md">Awards Details</CardTitle>
          <AddAwardDialog />
        </div>
      </CardHeader>

      <CardContent>
        {/* Only one form wrapping all awards */}
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {fields.length > 0 ? (
              <Accordion type="multiple" className="w-full">
                {fields.map((award, index) => (
                  <AccordionItem value={`item-${index}`} key={award.id}>
                    <AccordionTrigger
                      className="hover:no-underline p-4 data-[state=open]:bg-secondary rounded-xl border bg-card text-card-foreground shadow mb-6"
                      DeleteIcon={
                        <>
                          <DeleteDialog
                            trigger={
                              <Trash2 className="h-4 w-4 shrink-0 text-destructive ml-4" />
                            }
                            text="Your award will be deleted"
                            onReject={async () => {
                              await dispatch(
                                authThunks.updateProfile({
                                  userId: user?.userId,
                                  updateData: {
                                    awards: {
                                      value: user?.awards?.filter(
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
                      <div className="flex flex-col items-start w-full">
                        <h3 className="font-semibold text-left">
                          {award.award_name} at {award.institute}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {award.year}
                        </p>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-1">
                      <div className="space-y-4 p-6 rounded-xl bg-secondary/25">
                        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6">
                          {/* award_name */}
                          <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={control}
                            name={`awards.${index}.award_name`}
                            label="Award name"
                            placeholder={"Select award"}
                          />

                          {/* institute */}
                          <CustomFormField
                            fieldType={FormFieldType.SELECT_WITH_SEARCH}
                            control={control}
                            items={INSTITUTES}
                            name={`awards.${index}.institute`}
                            label="Institute"
                            placeholder={"Select institute..."}
                          />

                          {/* year */}
                          <CustomFormField
                            fieldType={FormFieldType.YEAR_PICKER}
                            control={control}
                            name={`awards.${index}.year`}
                            label="Year"
                            placeholder="Pick a year"
                          />
                        </div>

                        {/* description */}
                        <CustomFormField
                          fieldType={FormFieldType.TEXTAREA}
                          control={control}
                          name={`awards.${index}.description`}
                          label="Description"
                          placeholder="Tell us about your experience"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <>No Awards found, add one now!</>
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
