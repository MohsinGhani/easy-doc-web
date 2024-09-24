import { z } from "zod";

export enum ConsultingFor {
  SELF = "Self",
  OTHER = "Other",
}

export enum APPOINTMENT_STATUS {
  UNPAID = "unpaid",
  UPCOMING = "upcoming",
  REJECTED = "rejected",
  COMPLETED = "completed",
}

export const appointmentCreationSchema = z.object({
  consulting_for: z.nativeEnum(ConsultingFor, {
    required_error: "Consulting for is required",
  }),
  patient_name: z.string({
    required_error: "Name is required",
  }),
  gender: z.string({
    required_error: "Gender is required",
  }),
  dob: z.string({
    required_error: "Date of birth is required",
  }),
  blood_group: z.string({
    required_error: "Blood group is required",
  }),
  speciality: z.string({
    required_error: "Speciality is required",
  }),
  consultation_type: z.string({
    required_error: "Consultation type is required",
  }),
  phone_number: z
    .string({
      required_error: "Phone number is required",
    })
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  email: z.string().email("Invalid email address"),
  allergies: z.array(z.string()).optional(),
  current_medication: z.array(z.string()).optional(),
  description: z.string().optional(),
  attachments: z
    .array(
      z.object({
        name: z.string(),
        url: z.string(),
        mimeType: z.string(),
      })
    )
    .optional(),
  appointment_date: z.string({
    required_error: "Scheduled date is required",
  }),
  scheduled_date: z.object({
    start_time: z.string(),
    end_time: z.string(),
  }),
  reason: z.string({
    required_error: "Reason is required",
  }),
  status: z.string({
    required_error: "Appointment status is required",
  }),
});

export const paymentSchema = z.object({
  method: z.string({
    required_error: "Payment method is required",
  }),
  amount: z.string({
    required_error: "Amount is required",
  }),
  payment_date: z.string({
    required_error: "Payment date is required",
  }),
});

export type AppointmentCreationType = z.infer<typeof appointmentCreationSchema>;
export type PaymentType = z.infer<typeof paymentSchema>;
