import { z } from "zod";

export enum ConsultingFor {
  SELF = "Self",
  OTHER = "Other",
}

export enum APPOINTMENT_STATUS {
  PAYMENT_PENDING = "PAYMENT_PENDING",
  PAYMENT_FAILED = "PAYMENT_FAILED",
  PENDING_APPROVAL = "PENDING_APPROVAL",
  REJECTED = "REJECTED",
  UPCOMING = "UPCOMING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

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

export const appointmentCreationSchema = z.object({
  consulting_for: z.nativeEnum(ConsultingFor, {
    required_error: "Consulting for is required",
  }),
  display_name: z
    .string({
      required_error: "Name is required",
    })
    .optional(),
  gender: z
    .string({
      required_error: "Gender is required",
    })
    .optional(),
  dob: z
    .string()
    .refine((val) => new Date(val) <= new Date(), {
      message: "Date of birth cannot be in the future",
    })
    .refine((val) => new Date(val) >= new Date("1900-01-01"), {
      message: "Date of birth cannot be before 1900",
    })
    .refine(
      (val) => new Date().getFullYear() - new Date(val).getFullYear() >= 18,
      {
        message: "User must be at least 18 years old",
      }
    )
    .optional(),
  blood_group: z
    .string({
      required_error: "Blood group is required",
    })
    .optional(),
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
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .optional(),
  email: z.string().email("Invalid email address").optional(),
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
});

export type AppointmentCreationType = z.infer<typeof appointmentCreationSchema>;

export type PaymentType = z.infer<typeof paymentSchema>;
