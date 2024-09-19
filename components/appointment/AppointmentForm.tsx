"use client";

import React, { useEffect } from "react";
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
import { getServiceBySpeciality } from "@/lib/utils";

interface AppointmentFormProps {
  doctorId: string;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ doctorId }) => {
  const { user, loading } = useAppSelector((state) => state.auth);
  const { fetchedDoctor, loading: doctorLoader } = useAppSelector(
    (state) => state.doctor
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (doctorId && typeof doctorId === "string") {
      dispatch(doctorThunks.fetchDoctorById(doctorId));
    }
  }, [dispatch, doctorId]);

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

  const onSubmit = async (data: AppointmentCreationType) => {};

  const { control, handleSubmit, watch } = form;

  const speciality = watch("speciality");
  console.log("🚀 ~ speciality:", speciality);

  const uniqueSpecialities = new Set(
    fetchedDoctor?.services.map((service) => service.speciality)
  );

  return (
    <>
      <Accordion type="multiple">
        <AccordionItem value="patient-details">
          <AccordionTrigger className="hover:no-underline p-4 data-[state=open]:bg-secondary rounded-xl border bg-card text-card-foreground shadow mb-6">
            Patient Details
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col-reverse gap-16 md:flex-row">
              <div className="grid lg:grid-cols-3 gap-8">
                <Form {...form}>
                  <form onSubmit={handleSubmit(onSubmit)} className="grid">
                    <div className="grid col-span-2 lg:grid-cols-2 gap-8">
                      {/* consulting_for */}
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

                      {/* patient_name */}
                      <CustomFormField
                        name="patient_name"
                        label="Patient full name"
                        fieldType={FormFieldType.INPUT}
                        control={control}
                      />

                      {/* gender */}
                      <CustomFormField
                        name="gender"
                        label="Gender"
                        placeholder="Select"
                        fieldType={FormFieldType.SELECT}
                        items={GENDERS}
                        control={control}
                      />

                      {/* dob */}
                      <CustomFormField
                        name="dob"
                        label="Date of Birth"
                        fieldType={FormFieldType.DATE_PICKER}
                        control={control}
                      />

                      {/* blood_group */}
                      <CustomFormField
                        name="blood_group"
                        label="Blood Group"
                        fieldType={FormFieldType.SELECT}
                        items={BLOOD_GROUPS}
                        control={control}
                      />

                      {/* speciality */}
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

                      {/* consultation_type */}
                      <CustomFormField
                        name="consultation_type"
                        label="Consultation Type"
                        fieldType={FormFieldType.SELECT}
                        items={fetchedDoctor?.services
                          ?.filter(
                            (s) =>
                              s?.speciality.toLowerCase() ===
                              watch("speciality")
                          )
                          .map((s) => ({
                            label: s?.service,
                            value: s?.service,
                          }))}
                        control={control}
                      />

                      {/* phone_number */}
                      <CustomFormField
                        name="phone_number"
                        label="Contact no:"
                        fieldType={FormFieldType.PHONE_INPUT}
                        control={control}
                      />

                      {/* email */}
                      <CustomFormField
                        name="email"
                        label="Email"
                        fieldType={FormFieldType.EMAIL}
                        control={control}
                      />

                      {/* allergies */}
                      <CustomFormField
                        name="allergies"
                        label="Allergies"
                        fieldType={FormFieldType.MULTI_SELECT_WITH_SEARCH}
                        items={ALLERGIES}
                        control={control}
                      />

                      {/* current_medication */}
                      <CustomFormField
                        name="current_medication"
                        label="Current medications:"
                        fieldType={FormFieldType.MULTI_SELECT_WITH_SEARCH}
                        items={MEDICATIONS}
                        control={control}
                      />
                    </div>

                    {/* description */}
                    <CustomFormField
                      name="description"
                      label="Description"
                      fieldType={FormFieldType.TEXTAREA}
                      control={control}
                    />
                  </form>
                </Form>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="date-and-time">
          <AccordionTrigger className="hover:no-underline p-4 data-[state=open]:bg-secondary rounded-xl border bg-card text-card-foreground shadow mb-6">
            Appointment Date & Time
          </AccordionTrigger>
          <AccordionContent>asd</AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default AppointmentForm;
