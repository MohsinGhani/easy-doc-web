import { DateRange } from "react-day-picker";

export type BaseAppointment = {
  // Patient Specific Fields
  id: string;
  patientId: string;
  patient_avatarUrl: string;
  patient_city: string;
  patient_state: string;
  patient_country: string;
  patient_name: string;
  patient_gender: string;
  patient_age: number;
  patient_blood_group: string;
  patient_phone: string;
  patient_email: string;

  // Appointment Specific Fields
  speciality: string;
  consultationType: string;
  scheduledDate: DateRange;
  allergies: string[];
  current_medications: string[];
  attachments: Array<{
    id: string;
    url: string;
    name: string;
    mimeType: string;
  }>;
  description: string;
  status: "pending" | "completed" | "cancelled" | "upcoming";
  paid: boolean;
  payment: {
    method: string;
    id: string;
    paymentDate: string;
    amount: string;
  };
};

export type Payment = {
  method: string;
  id: string;
  paymentDate: string;
  amount: string;
};

export type UpcomingAppointment = BaseAppointment;

export type PendingRequest = BaseAppointment;

export type CancelledAppointment = BaseAppointment;

export type CompletedAppointment = BaseAppointment;
