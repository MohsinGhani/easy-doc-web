import { DateRange } from "react-day-picker";

export type BaseAppointment = {
  id: string;
  avatarUrl: string;
  patientId: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  scheduledDate: DateRange;
  consultationType: string;
  gender: string;
  address: string;
  birthDate: string;
  speciality: string;
  age: number;
  attachments: Array<{
    id: string;
    url: string;
    name: string;
    mimeType: string;
  }>;
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
