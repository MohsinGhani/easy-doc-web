"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { experienceSchema } from "@/models/validationSchemas";
import { authThunks } from "@/lib/features/auth/authThunks";
import AddExperienceDialog from "./AddExperienceDialog";
import { Loader } from "../Loader";

export default function ManageExperiences() {
  const { user, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    experiences: Experience[];
  }>({
    resolver: zodResolver(
      z.object({
        experiences: z.array(experienceSchema),
      })
    ),
    defaultValues: {
      experiences: user?.experiences || [],
    },
  });

  const onSubmit = async (data: { experiences: Experience[] }) => {
    // await dispatch(
    //   authThunks.updateProfile({
    //     userId: user?.userId || "",
    //     updateData: { experiences: data.experiences },
    //   })
    // );
  };

  if (loading) return <Loader />;

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <div className="flex sm:flex-row flex-col gap-4 justify-between items-center">
            <CardTitle className="text-2xl sm:text-md">
              Practice Experience
            </CardTitle>

            <AddExperienceDialog />
          </div>
        </CardHeader>

        <CardContent>
          {user?.experiences?.length > 0 ? (
            <Accordion type="multiple" className="w-full">
              {/* Rendering each experience */}
              {user?.experiences?.map((exp, index) => (
                <AccordionItem value={`item-${index}`} key={exp.hospital_name}>
                  <AccordionTrigger className="hover:no-underline p-4 rounded-xl border bg-card text-card-foreground shadow mb-6">
                    <div className="flex flex-col items-start w-full">
                      <h3 className="font-semibold">{exp.hospital_name}</h3>
                      <p className="text-sm text-gray-500">{exp.time_period}</p>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Title */}
                      <Controller
                        name={`experiences.${index}.title`}
                        control={control}
                        render={({ field }) => (
                          <div className="space-y-1.5">
                            <Label htmlFor={`title-${index}`}>Title</Label>
                            <Input {...field} id={`title-${index}`} />
                            {errors.experiences?.[index]?.title && (
                              <p className="text-red-500 text-sm">
                                {errors.experiences?.[index]?.title?.message}
                              </p>
                            )}
                          </div>
                        )}
                      />

                      {/* Hospital Name */}
                      <Controller
                        name={`experiences.${index}.hospital_name`}
                        control={control}
                        render={({ field }) => (
                          <div className="space-y-1.5">
                            <Label htmlFor={`hospital-${index}`}>
                              Hospital Name
                            </Label>
                            <Input {...field} id={`hospital-${index}`} />
                            {errors.experiences?.[index]?.hospital_name && (
                              <p className="text-red-500 text-sm">
                                {
                                  errors.experiences?.[index]?.hospital_name
                                    ?.message
                                }
                              </p>
                            )}
                          </div>
                        )}
                      />

                      {/* Employment Type */}
                      <Controller
                        name={`experiences.${index}.employment_type`}
                        control={control}
                        render={({ field }) => (
                          <div className="space-y-1.5">
                            <Label htmlFor={`employment-${index}`}>
                              Employment Type
                            </Label>
                            <Select
                              {...field}
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger id={`employment-${index}`}>
                                <SelectValue placeholder="Select employment type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="fulltime">
                                  Fulltime
                                </SelectItem>
                                <SelectItem value="parttime">
                                  Part-time
                                </SelectItem>
                                <SelectItem value="contract">
                                  Contract
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.experiences?.[index]?.employment_type && (
                              <p className="text-red-500 text-sm">
                                {
                                  errors.experiences?.[index]?.employment_type
                                    ?.message
                                }
                              </p>
                            )}
                          </div>
                        )}
                      />

                      {/* City */}
                      <Controller
                        name={`experiences.${index}.city`}
                        control={control}
                        render={({ field }) => (
                          <div className="space-y-1.5">
                            <Label htmlFor={`city-${index}`}>City</Label>
                            <Input {...field} id={`city-${index}`} />
                            {errors.experiences?.[index]?.city && (
                              <p className="text-red-500 text-sm">
                                {errors.experiences?.[index]?.city?.message}
                              </p>
                            )}
                          </div>
                        )}
                      />

                      {/* Country */}
                      <Controller
                        name={`experiences.${index}.country`}
                        control={control}
                        render={({ field }) => (
                          <div className="space-y-1.5">
                            <Label htmlFor={`country-${index}`}>Country</Label>
                            <Input {...field} id={`country-${index}`} />
                            {errors.experiences?.[index]?.country && (
                              <p className="text-red-500 text-sm">
                                {errors.experiences?.[index]?.country?.message}
                              </p>
                            )}
                          </div>
                        )}
                      />

                      {/* Currently Working */}
                      <Controller
                        name={`experiences.${index}.currently_working`}
                        control={control}
                        render={({ field }) => (
                          <div className="mt-4">
                            <Checkbox
                              id={`current-${index}`}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <Label
                              htmlFor={`current-${index}`}
                              className="ml-2"
                            >
                              I currently work here
                            </Label>
                          </div>
                        )}
                      />

                      {/* Description */}
                      <Controller
                        name={`experiences.${index}.description`}
                        control={control}
                        render={({ field }) => (
                          <div className="mt-4 space-y-1.5">
                            <Label htmlFor={`description-${index}`}>
                              Description
                            </Label>
                            <Textarea {...field} id={`description-${index}`} />
                          </div>
                        )}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <>No Experiences found add one now!</>
          )}
        </CardContent>

        {user?.experiences?.length > 0 && (
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button type="submit" className="bg-blue-500 text-white">
              Save Changes
            </Button>
          </CardFooter>
        )}
      </form>
    </Card>
  );
}
