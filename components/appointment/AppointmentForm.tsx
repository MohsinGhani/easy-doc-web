"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  appointmentCreationSchema,
  AppointmentCreationType,
  ConsultingFor,
} from "@/models/Appointment";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CustomFormField, { FormFieldType } from "../auth/CustomFormField";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { doctorThunks } from "@/lib/features/doctor/doctorThunks";
import {
  ALLERGIES,
  APPOINTMENTS_REASONS,
  BLOOD_GROUPS,
  GENDERS,
  MEDICATIONS,
  WEEK_DAYS,
} from "@/constants";
import {
  appointmentsApiClient,
  getDayName,
  removeDaySuffix,
  uploadFilesToS3,
} from "@/lib/utils";
import { toast } from "sonner";
import FileUploadComponent, { FileItem } from "./FileUploadComponent";
import { Loader } from "../common/Loader";
import DoctorCard from "../patient/DoctorCard";
import PriceDetails from "./PriceDetails";
import { format, parse } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AvailableTimingsTabsContent from "./AvailableTimingsTabsContent";
import { enUS } from "date-fns/locale";

interface AppointmentFormProps {
  doctorId: string;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ doctorId }) => {
  // Redux state selectors & actions
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);
  const { fetchedDoctor, loading: doctorLoader } = useAppSelector(
    (state) => state.doctor
  );
  const [activeTab, setActiveTab] = useState("monday");
  const [selectedFiles, setSelectedFiles] = useState<FileItem[]>([]);

  // Fetch doctor details based on doctorId prop
  useEffect(() => {
    if (doctorId) {
      dispatch(doctorThunks.fetchDoctorById(doctorId));
    }
  }, [dispatch, doctorId]);

  // Setup the form with default values
  const form = useForm<AppointmentCreationType>({
    resolver: zodResolver(appointmentCreationSchema),
    defaultValues: {
      doctorId: doctorId || "",
      patientId: user?.userId || "",
      consulting_for: "self" as ConsultingFor,
      patient_name: `${user?.given_name} ${user.family_name}` || "",
      gender: GENDERS[0].value,
      dob: "",
      blood_group: BLOOD_GROUPS[0].value,
      consultation_type: "online",
      phone_number: user?.phone_number || "",
      email: user?.email || "",
    },
  });

  // Form submit handler
  const onSubmit = async (data: AppointmentCreationType) => {
    try {
      // Step 1: Upload files to S3 using the helper function
      const uploadedFiles = await uploadFilesToS3(selectedFiles);

      // Step 2: Add uploaded files to form data
      data.attachments = uploadedFiles;

      // Step 3: Submit form data to the backend
      await appointmentsApiClient.post("/appointments", data);

      toast.success("Appointment created successfully.");
      form.reset(); // Reset the form fields
      setSelectedFiles([]); // Clear selected files
    } catch (error) {
      console.error("Error submitting appointment:", error);
      toast.error("Failed to create appointment.");
    }
  };

  // Extract control and handleSubmit methods from form
  const { control, handleSubmit, watch } = form;

  const speciality = watch("speciality");
  const appointment_date = watch("appointment_date");
  console.log("🚀 ~ appointment_date:", appointment_date);
  console.log("🚀 ~ activeTab:", activeTab);

  useEffect(() => {
    if (appointment_date) {
      console.log("🚀 ~ useEffect ~ appointment_date:", appointment_date);

      const dayOfWeek = getDayName(appointment_date);
      console.log("🚀 ~ useEffect ~ dayOfWeek:", dayOfWeek);
      setActiveTab(dayOfWeek);
    }
  }, [appointment_date]);

  useEffect(() => {
    if (activeTab && appointment_date) {
      const date = parse(appointment_date, "d MMM yyyy", new Date());
      const currentDayOfWeek = format(date, "EEEE").toLowerCase();
      if (currentDayOfWeek !== activeTab) {
        const daysToAdd =
          WEEK_DAYS.findIndex((day) => day === activeTab) - date.getDay();
        const newDate = new Date(date);
        newDate.setDate(date.getDate() + daysToAdd);
        form.setValue("appointment_date", format(newDate, "yyyy-MM-dd"));
      }
    }
  }, [activeTab]);

  // Compute unique specialities based on doctor services
  const uniqueSpecialities = useMemo(
    () => new Set(fetchedDoctor?.services.map((service) => service.speciality)),
    [fetchedDoctor?.services]
  );

  const handleProceedToCheckout = () => {
    // Handle checkout logic here
    console.log("Proceed to checkout clicked!");
  };

  // Show loader if doctor details or user details are loading
  if (doctorLoader || loading) return <Loader />;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="gap-16 grid xl:grid-cols-4">
          <Accordion type="multiple" className="xl:col-span-3">
            <AccordionItem value="patient-details">
              <AccordionTrigger className="hover:no-underline p-4 data-[state=open]:bg-secondary rounded-xl border bg-card text-card-foreground shadow mb-6">
                Patient Details
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Consulting For */}
                    <CustomFormField
                      name="consulting_for"
                      label="Consulting For"
                      fieldType={FormFieldType.SELECT}
                      items={[
                        { label: "Self", value: "self" },
                        { label: "Other", value: "other" },
                      ]}
                      control={control}
                    />

                    {/* Patient Name */}
                    <CustomFormField
                      name="patient_name"
                      label="Patient full name"
                      fieldType={FormFieldType.INPUT}
                      control={control}
                    />

                    {/* Gender */}
                    <CustomFormField
                      name="gender"
                      label="Gender"
                      placeholder="Select"
                      fieldType={FormFieldType.SELECT}
                      items={GENDERS}
                      control={control}
                    />

                    {/* Date of Birth */}
                    <CustomFormField
                      name="dob"
                      label="Date of Birth"
                      fieldType={FormFieldType.DATE_PICKER}
                      control={control}
                    />

                    {/* Blood Group */}
                    <CustomFormField
                      name="blood_group"
                      label="Blood Group"
                      fieldType={FormFieldType.SELECT}
                      items={BLOOD_GROUPS}
                      control={control}
                    />

                    {/* Speciality */}
                    <CustomFormField
                      name="speciality"
                      label="Speciality"
                      fieldType={FormFieldType.SELECT}
                      items={Array.from(uniqueSpecialities).map(
                        (speciality) => ({
                          label: speciality,
                          value: speciality.toLowerCase(),
                        })
                      )}
                      control={control}
                    />

                    {/* Consultation Type */}
                    <CustomFormField
                      name="consultation_type"
                      label="Consultation Type"
                      fieldType={FormFieldType.SELECT}
                      items={fetchedDoctor?.services
                        ?.filter(
                          (s) => s?.speciality.toLowerCase() === speciality
                        )
                        .map((s) => ({
                          label: s?.service,
                          value: s?.service,
                        }))}
                      control={control}
                    />

                    {/* Phone Number */}
                    <CustomFormField
                      name="phone_number"
                      label="Contact no:"
                      fieldType={FormFieldType.PHONE_INPUT}
                      control={control}
                    />

                    {/* Email */}
                    <CustomFormField
                      name="email"
                      label="Email"
                      fieldType={FormFieldType.EMAIL}
                      control={control}
                    />

                    {/* Reason */}
                    <CustomFormField
                      name="reason"
                      label="Reason"
                      fieldType={FormFieldType.SELECT}
                      control={control}
                      items={APPOINTMENTS_REASONS}
                    />

                    {/* Allergies */}
                    <CustomFormField
                      name="allergies"
                      label="Allergies"
                      fieldType={FormFieldType.MULTI_SELECT_WITH_SEARCH}
                      items={ALLERGIES}
                      control={control}
                    />

                    {/* Current Medication */}
                    <CustomFormField
                      name="current_medication"
                      label="Current medications:"
                      placeholder="Select medications"
                      fieldType={FormFieldType.MULTI_SELECT_WITH_SEARCH}
                      items={MEDICATIONS}
                      control={control}
                    />
                  </div>

                  {/* Description */}
                  <CustomFormField
                    name="description"
                    label="Description"
                    fieldType={FormFieldType.TEXTAREA}
                    control={control}
                  />

                  {/* File Upload Component */}
                  <FileUploadComponent onFilesUploaded={setSelectedFiles} />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="date-and-time">
              <AccordionTrigger className="hover:no-underline p-4 data-[state=open]:bg-secondary rounded-xl border bg-card text-card-foreground shadow mb-6">
                Appointment Date & Time
              </AccordionTrigger>
              <AccordionContent className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="flex-col justify-start items-start gap-[5px] inline-flex">
                    <p className="text-muted-foreground text-sm font-normal">
                      Today's date:
                    </p>
                    <p className="text-base font-medium">
                      {format(new Date(), "dd MMMM yyyy - EEEE")}
                    </p>
                  </div>

                  <div className="flex items-center lg:justify-end">
                    <div className="max-w-sm">
                      <CustomFormField
                        name="appointment_date"
                        label="Select appointment date"
                        fieldType={FormFieldType.DAY_PICKER}
                        control={control}
                      />
                    </div>
                  </div>
                </div>

                <CustomFormField
                  name="scheduled_date"
                  fieldType={FormFieldType.SKELETON}
                  control={control}
                  renderSkeleton={(field) => (
                    <Tabs
                      defaultValue={activeTab}
                      onValueChange={setActiveTab}
                      className="w-full"
                    >
                      <div className="md:hidden w-full">
                        <TabsList className="w-full">
                          <Carousel className="w-full max-w-[65%] mx-auto">
                            <CarouselContent>
                              {WEEK_DAYS.map((day, i) => (
                                <CarouselItem
                                  key={i}
                                  className="basis-1/3 pl-1"
                                >
                                  <TabsTrigger
                                    value={day}
                                    className="w-full capitalize py-2 px-1 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                  >
                                    {day.slice(0, 3)}
                                  </TabsTrigger>
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <CarouselPrevious type="button" />
                            <CarouselNext type="button" />
                          </Carousel>
                        </TabsList>
                      </div>

                      <TabsList className="hidden md:flex w-full justify-between bg-background mb-6 mt-2">
                        {WEEK_DAYS.map((day, i) => (
                          <TabsTrigger
                            key={i}
                            value={day}
                            className="flex-1 capitalize py-2 px-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                          >
                            {day}
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      {WEEK_DAYS.map((day, dayIndex) => (
                        <AvailableTimingsTabsContent
                          day={day}
                          dayIndex={dayIndex}
                          key={dayIndex}
                          field={field} // Replace with your actual field prop
                        />
                      ))}
                    </Tabs>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* <div className="gap-6 grid xl:grid-cols-1 lg:grid-cols-2">
            <DoctorCard doctor={fetchedDoctor as User} isBookingCard />

            <PriceDetails
              consultingFee={120.32}
              onProceed={handleProceedToCheckout}
            />
          </div> */}
        </div>
      </form>
    </Form>
  );
};

export default AppointmentForm;
