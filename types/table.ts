import { DateRange } from "react-day-picker";

export type BaseAppointment = {
  patientId: string;
  doctorId: string;
  patient: User;
  doctor: User;

  // Appointment Specific Fields
  speciality: string;
  consultationType: string;
  scheduledDate: DateRange;
  allergies: string[];
  current_medications: string[];
  reason: string;
  attachments: Array<{
    id: string;
    url: string;
    name: string;
    mimeType: string;
  }>;
  description: string;
  status: "pending" | "completed" | "cancelled" | "upcoming";
  paid: boolean;
  payment: Payment;
};

export type Payment = {
  method: string;
  paymentId: string;
  paymentDate: string;
  amount: string;
};
