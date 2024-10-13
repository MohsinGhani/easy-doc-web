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
  CONSULTATION_TYPES,
  GENDERS,
  MEDICATIONS,
} from "@/constants";
import { cn, uploadFilesToS3 } from "@/lib/utils";
import FileUploadComponent, { FileItem } from "./FileUploadComponent";
import { Loader } from "../common/Loader";
import DoctorCard from "../patient/DoctorCard";
import PriceDetails from "./PriceDetails";
import { format } from "date-fns";
import AvailableTimingsTabs from "./AvailableTimingsTabs";
import { useRouter } from "next/navigation";
import { appointmentThunks } from "@/lib/features/appointment/appointmentThunks";
import { toast } from "sonner";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { Card } from "../ui/card";

interface AppointmentFormProps {
  doctorId: string;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ doctorId }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { user, loading } = useAppSelector((state) => state.auth);
  const { fetchedDoctor, loading: doctorLoader } = useAppSelector(
    (state) => state.doctor
  );
  const [selectedFiles, setSelectedFiles] = useState<FileItem[]>([]);
  const form = useForm<AppointmentCreationType>({
    resolver: zodResolver(appointmentCreationSchema),
    defaultValues: {
      consulting_for: ConsultingFor.SELF,
      consultation_type: "online",
      reason: APPOINTMENTS_REASONS[0].value,
      allergies: [],
      current_medication: [],
      description: "",
      appointment_date: format(new Date(), "d MMM yyyy"),
      speciality: "",
      attachments: [],
    },
  });
  const {
    control,
    handleSubmit,
    watch,
    // formState: { errors },
  } = form;
  // console.log("🚀 ~ errors:", errors);
  const speciality = watch("speciality");
  const consultation_type = watch("consultation_type");
  const consulting_for = watch("consulting_for");

  useEffect(() => {
    if (doctorId) {
      dispatch(doctorThunks.fetchDoctorById(doctorId));
    }
  }, [dispatch, doctorId]);

  useEffect(() => {
    if (consulting_for === ConsultingFor.SELF) {
      toast.custom(() => (
        <Card className="flex items-center justify-center w-full p-6 rounded-lg">
          <div className="flex items-center justify-between gap-6">
            <span>
              Before booking an appointment, make sure you have updated you
              profile Info:
            </span>

            <Link
              href={`/my-settings`}
              className={cn(buttonVariants({ variant: "default", size: "sm" }))}
            >
              Add Info
            </Link>
          </div>
        </Card>
      ));

      [
        "display_name",
        "gender",
        "dob",
        "blood_group",
        "phone_number",
        "email",
      ].map((f) =>
        form.resetField(
          f as
            | "display_name"
            | "gender"
            | "dob"
            | "blood_group"
            | "phone_number"
            | "email",
          {
            keepDirty: false,
            keepError: false,
            keepTouched: false,
          }
        )
      );
    }

    if (user && consulting_for === ConsultingFor.OTHER) {
      form.setValue("display_name", `${user?.given_name} ${user.family_name}`);
      form.setValue("gender", user?.gender || GENDERS[0].value);
      form.setValue("dob", user?.dob);
      form.setValue("blood_group", user?.blood_group || BLOOD_GROUPS[0].value);
      form.setValue("phone_number", user?.phone_number);
      form.setValue("email", user?.email);
    }
  }, [consulting_for, form, user]);

  const uniqueSpecialities = useMemo(
    () => new Set(fetchedDoctor?.services.map((service) => service.speciality)),
    [fetchedDoctor?.services]
  );
  const consultingFee = useMemo(() => {
    const service = fetchedDoctor?.services.find(
      (s) => s.service === consultation_type
    );

    return +(service?.fee || 0);
  }, [consultation_type, fetchedDoctor?.services]);

  const onSubmit = async (data: AppointmentCreationType) => {
    try {
      // Step 0: Check if the patient's profile is complete if not then show toast error and then redirect to settings page
      if (
        consulting_for === ConsultingFor.SELF &&
        user?.profile_status !== "COMPLETED"
      ) {
        toast.error(
          "Please complete your profile info before booking an appointment"
        );
        router.push("/my-settings");
        return;
      }

      // Step 1: Upload files to S3 using the helper function
      const uploadedFiles =
        selectedFiles.length > 0 ? await uploadFilesToS3(selectedFiles) : [];

      // Step 2: Add uploaded files to form data
      data.attachments = uploadedFiles;

      let patientData = {};

      // Step 3: If the appointment is for somone else add its data
      if (data.consulting_for === ConsultingFor.OTHER) {
        patientData = {
          display_name: data.display_name,
          gender: data.gender,
          dob: data.dob,
          blood_group: data.blood_group,
          phone_number: data.phone_number,
          email: data.email,
          age:
            new Date().getFullYear() -
            new Date(new Date(data.dob as string)).getFullYear(),
          picture:
            data.gender === "Male"
              ? "https://cdn-icons-png.freepik.com/512/2869/2869791.png?ga=GA1.1.1652342059.1728802380"
              : data.gender === "Female"
              ? "https://cdn-icons-png.freepik.com/512/4310/4310226.png?ga=GA1.1.1652342059.1728802380"
              : "https://cdn-icons-png.freepik.com/512/10835/10835597.png?ga=GA1.1.1652342059.1728802380",
        };
      }

      const newAppointment = {
        ...data,
        ...(data.consulting_for === ConsultingFor.OTHER && { patientData }),
        doctorId,
        patientId: user.userId,
        visible_date: `${data.appointment_date} - ${data.scheduled_date.start_time} to ${data.scheduled_date.end_time}`,
        amount: consultingFee,
      };

      // Step 4: Submit form data to the backend
      const { payload, type } = await dispatch(
        appointmentThunks.createAppointment(
          newAppointment as unknown as Partial<
            Appointment & { [key: string]: any }
          >
        )
      );

      // Step 5: Handle the backend's response effectively
      if (type === "appointment/createAppointment/fulfilled") {
        const createdAppointment = payload as Appointment;
        const appointmentId = createdAppointment?.appointmentId;

        setSelectedFiles([]);
        router.push(
          `/my-appointments/${appointmentId}/checkout?appointmentReason=${data?.reason}`
        );
      }
    } catch (error) {
      console.error("Error submitting appointment:", error);
    }
  };

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
                  <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
                    {/* Consulting For */}
                    <CustomFormField
                      name="consulting_for"
                      label="Consulting For"
                      fieldType={FormFieldType.SELECT}
                      items={CONSULTATION_TYPES}
                      control={control}
                    />

                    {consulting_for == ConsultingFor.OTHER && (
                      <>
                        {/* Display Name */}
                        <CustomFormField
                          name="display_name"
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
                      </>
                    )}

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
                      maxSelection={6}
                      maxSelectionText="Maximum 6 allergies can be selected"
                    />

                    {/* Current Medication */}
                    <CustomFormField
                      name="current_medication"
                      label="Current medications:"
                      placeholder="Select medications"
                      fieldType={FormFieldType.MULTI_SELECT_WITH_SEARCH}
                      items={MEDICATIONS}
                      control={control}
                      maxSelection={6}
                      maxSelectionText="Maximum 6 medications can be selected"
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
              <AccordionContent className="space-y-8 @container">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="flex-col justify-start items-start gap-[5px] inline-flex">
                    <p className="text-muted-foreground text-sm font-normal">
                      Today&apos;s date:
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

                <AvailableTimingsTabs />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="gap-6 grid xl:grid-cols-1 sm:grid-cols-2">
            <DoctorCard doctor={fetchedDoctor as User} isBookingCard />

            <PriceDetails consultingFee={consultingFee} />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AppointmentForm;
