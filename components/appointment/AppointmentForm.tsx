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
import { ALLERGIES, BLOOD_GROUPS, GENDERS, MEDICATIONS } from "@/constants";
import { appointmentsApiClient, uploadFilesToS3 } from "@/lib/utils";
import { toast } from "sonner";
import FileUploadComponent, { FileItem } from "./FileUploadComponent";
import { Loader } from "../common/Loader";
import DoctorCard from "../patient/DoctorCard";
import PriceDetails from "./PriceDetails";

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
  console.log("🚀 ~ speciality:", speciality)

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
    <div className="gap-16 grid xl:grid-cols-4">
      <Accordion type="multiple" className="xl:col-span-3">
        <AccordionItem value="patient-details">
          <AccordionTrigger className="hover:no-underline p-4 data-[state=open]:bg-secondary rounded-xl border bg-card text-card-foreground shadow mb-6">
            Patient Details
          </AccordionTrigger>
          <AccordionContent>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    items={Array.from(uniqueSpecialities).map((speciality) => ({
                      label: speciality,
                      value: speciality.toLowerCase(),
                    }))}
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
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="date-and-time">
          <AccordionTrigger className="hover:no-underline p-4 data-[state=open]:bg-secondary rounded-xl border bg-card text-card-foreground shadow mb-6">
            Appointment Date & Time
          </AccordionTrigger>
          <AccordionContent>
            <div>Select date and time for your appointment</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="gap-6 grid xl:grid-cols-1 lg:grid-cols-2">
        <DoctorCard doctor={fetchedDoctor as User} isBookingCard />

        <PriceDetails
          consultingFee={120.32}
          onProceed={handleProceedToCheckout}
        />
      </div>
    </div>
  );
};

export default AppointmentForm;
