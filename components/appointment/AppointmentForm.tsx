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
import { uploadFilesToS3 } from "@/lib/utils";
import FileUploadComponent, { FileItem } from "./FileUploadComponent";
import { Loader } from "../common/Loader";
import DoctorCard from "../patient/DoctorCard";
import PriceDetails from "./PriceDetails";
import { format } from "date-fns";
import AvailableTimingsTabs from "./AvailableTimingsTabs";
import { useRouter } from "next/navigation";
import { appointmentThunks } from "@/lib/features/appointment/appointmentThunks";

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

  useEffect(() => {
    if (doctorId) {
      dispatch(doctorThunks.fetchDoctorById(doctorId));
    }
  }, [dispatch, doctorId]);

  const form = useForm<AppointmentCreationType>({
    resolver: zodResolver(appointmentCreationSchema),
    defaultValues: {
      consulting_for: "self" as ConsultingFor,
      patient_name: `${user?.given_name} ${user.family_name}` || "",
      gender: GENDERS[0].value,
      dob: "",
      blood_group: BLOOD_GROUPS[0].value,
      consultation_type: "online",
      phone_number: user?.phone_number || "",
      email: user?.email || "",
      reason: APPOINTMENTS_REASONS[0].value,
      allergies: [],
      current_medication: [],
      description: "",
      appointment_date: format(new Date(), "d MMM yyyy"),
      speciality: "",
      attachments: [],
      status: "PENDING",
    },
  });

  const { control, handleSubmit, watch } = form;
  const speciality = watch("speciality");
  const consultation_type = watch("consultation_type");

  const uniqueSpecialities = useMemo(
    () => new Set(fetchedDoctor?.services.map((service) => service.speciality)),
    [fetchedDoctor?.services]
  );

  const consultingFee = useMemo(() => {
    const service = fetchedDoctor?.services.find(
      (s) => s.service === consultation_type
    );

    return +(service?.fee || 0);
  }, [consultation_type]);

  const onSubmit = async (data: AppointmentCreationType) => {
    try {
      // Step 1: Upload files to S3 using the helper function
      const uploadedFiles = await uploadFilesToS3(selectedFiles);

      // Step 2: Add uploaded files to form data
      data.attachments = uploadedFiles;

      const patientData = {
        patient_name: data.patient_name,
        gender: data.gender,
        dob: data.dob,
        blood_group: data.blood_group,
        phone_number: data.phone_number,
        email: data.email,
        age:
          new Date().getFullYear() -
          new Date(new Date(data.dob).toISOString()).getFullYear(),
      };

      const newAppointment = {
        ...data,
        doctorId: doctorId,
        patientId: user.userId,
        visible_date: `${data.appointment_date} - ${data.scheduled_date.start_time} to ${data.scheduled_date.end_time}`,
        amount: consultingFee,
        status: "PAYMENT_PENDING",
        patientData,
      };

      // Step 3: Submit form data to the backend
      const { payload, type } = await dispatch(
        appointmentThunks.createAppointment(
          newAppointment as unknown as Partial<
            Appointment & { [key: string]: any }
          >
        )
      );

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
