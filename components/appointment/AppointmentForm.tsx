"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import { functionsApiClient } from "@/lib/utils";
import { UploadCloud } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Loader } from "../common/Loader";

interface AppointmentFormProps {
  doctorId: string;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ doctorId }) => {
  const dispatch = useAppDispatch();
  const filesInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviewUrls, setFilePreviewUrls] = useState<string[]>([]);
  console.log("🚀 ~ selectedFiles:", selectedFiles);
  console.log("🚀 ~ filePreviewUrls:", filePreviewUrls);

  const { user, loading } = useAppSelector((state) => state.auth);
  const { fetchedDoctor, loading: doctorLoader } = useAppSelector(
    (state) => state.doctor
  );

  const handleFilesInputClick = useCallback(() => {
    filesInputRef.current?.click();
  }, []);

  const handleFilesChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (!files || files.length === 0) return;

      const filesArray = Array.from(files);

      for (const file of filesArray) {
        if (file.size > 10 * 1024 * 1024) {
          return toast.error("File must be less than 10MB.");
        }

        setSelectedFiles((prev) => [...prev, file]);

        const { data } = await functionsApiClient.post(
          "/generate-presigned-url",
          {
            fileName: file.name,
            fileType: file.type,
          }
        );

        const { uploadURL } = data;

        await functionsApiClient.put(uploadURL, file, {
          headers: {
            "Content-Type": file.type,
          },
        });

        toast.success("File uploaded successfully.");

        if (file.type.startsWith("image/")) {
          setFilePreviewUrls((prev) => [...prev, URL.createObjectURL(file)]);
        } else {
          setFilePreviewUrls((prev) => [...prev, ""]);
        }
      }
    },
    []
  );

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

  const onSubmit = async (data: AppointmentCreationType) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
  };

  const { control, handleSubmit, watch } = form;

  const uniqueSpecialities = useMemo(
    () => new Set(fetchedDoctor?.services.map((service) => service.speciality)),
    [fetchedDoctor?.services]
  );

  if (doctorLoader || loading) return <Loader />;

  return (
    <div className="gap-16 grid lg:grid-cols-4">
      <Accordion type="multiple" className="col-span-3">
        <AccordionItem value="patient-details">
          <AccordionTrigger className="hover:no-underline p-4 data-[state=open]:bg-secondary rounded-xl border bg-card text-card-foreground shadow mb-6">
            Patient Details
          </AccordionTrigger>
          <AccordionContent>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-8">
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
                    items={Array.from(uniqueSpecialities).map((speciality) => ({
                      label: speciality,
                      value: speciality.toLowerCase(),
                    }))}
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
                          s?.speciality.toLowerCase() === watch("speciality")
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

                <div
                  className="flex items-center gap-6 p-8 border rounded-xl border-dashed cursor-pointer"
                  onClick={handleFilesInputClick}
                >
                  {/* Icon */}
                  <UploadCloud
                    size={48}
                    color="#00000066"
                    className="text-muted-foreground stroke-1"
                  />

                  <div className="flex items-center justify-between w-full">
                    <div className="space-y-2">
                      <p className="text-[#1e1e1e] text-[13px] font-normal">
                        Select a file or drag and drop here
                      </p>

                      <p className="text-black/40 text-xs font-normal">
                        JPG, PNG or PDF, file size no more than 10MB
                      </p>
                    </div>

                    <Button variant={"outline"}>Select file</Button>
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    ref={filesInputRef}
                    style={{ display: "none" }}
                    onChange={handleFilesChange}
                  />
                </div>
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="date-and-time">
          <AccordionTrigger className="hover:no-underline p-4 data-[state=open]:bg-secondary rounded-xl border bg-card text-card-foreground shadow mb-6">
            Appointment Date & Time
          </AccordionTrigger>
          <AccordionContent>asd</AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="">asd</div>
    </div>
  );
};

export default AppointmentForm;
