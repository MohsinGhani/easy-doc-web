declare type Gender = "male" | "female" | "other" | "N/D";
declare interface DateRange {
  start_time: string;
  end_time: string;
}

declare type weekDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

declare type AvailableDay = {
  day: weekDay;
  slots: AvailableSlot[];
};

declare type PROFILE_STATUS = "COMPLETED" | "INCOMPLETE";
declare type PAYMENT_STATUS = "PENDING" | "FAILED" | "COMPLETED";

declare type AvailableSlot = {
  start_time: string;
  end_time: string;
  reserved?: boolean;
};

declare type EMPLOYEMENT_TYPE = "Full Time" | "Part Time" | "Contract";

declare interface Experience {
  title: string;
  description?: string;
  employment_type: EMPLOYEMENT_TYPE;
  hospital_name: string;
  city: string;
  country: string;
  currently_working: boolean;
  start_date: string;
  end_date: string;
  [key: string]: string | undefined;
}

declare interface Award {
  award_name: string;
  description: string;
  institute: string;
  year: string;
  [key: string]: string | undefined;
}

declare interface Education {
  degree_name: string;
  field: string;
  description: string;
  institute: string;
  start_date: string;
  end_date: string;
  currently_studying: boolean;
  grade: string;
  [key: string]: string | undefined;
}

declare type RatingNumber = 1 | 2 | 3 | 4 | 5;

declare interface Review {
  name: string;
  createdAt: string;
  rating: RatingNumber;
  comment: string;
  picture: string;
  city: string;
  country: string;
  patientId: string;
  doctorId: string;
  reviewId: string;
}

declare interface Service {
  service: string;
  speciality: string;
  description: string;
  fee: string;
}

declare interface Speciality {
  name: string;
  icon: string;
  description: string;
}

declare type User = {
  userId: string;
  role: string;
  email: string;
  given_name: string;
  family_name: string;
  display_name: string;
  phone_number: string;
  picture: string;
  designation: string;
  bio: string;
  years_of_experience: string;
  city: string;
  country: string;
  address: string;
  state: string;
  zip_code: string;
  dob: string;
  age: number;
  blood_group: string;
  gender: Gender;
  location: string;
  overallRating: number;
  totalReviews: number;
  ratingsBreakdownPercentages: { [key: number]: number };
  available: boolean;
  verified: number;
  average_fee: number;
  languages: string[];
  experiences: Experience[];
  awards: Award[];
  education: Education[];
  availableDays: AvailableDay[];
  reviews: Review[];
  services: Service[];
  no_of_appointments: number;
  profile_status: PROFILE_STATUS;
  profile_completion: number;
  createdAt: string;
  updatedAt: string;
  licence: string;
  stripeAccountId: string;
  stripe_account_active: boolean;
};

declare interface City {
  id: string;
  name: string;
  admin1: string | null;
  lat: string;
  lon: string;
  pop: string;
}

declare interface Language {
  label: string;
  value: string;
}

declare type APPOINTMENT_STATUS =
  | "PAYMENT_PENDING"
  | "PAYMENT_FAILED"
  | "PENDING_APPROVAL"
  | "REJECTED"
  | "UPCOMING"
  | "COMPLETED"
  | "CANCELLED";

declare type Appointment = {
  patientId: string;
  doctorId: string;
  appointmentId: string;
  patient: User;
  doctor: User;

  // Appointment Specific Fields
  note: string;
  speciality: string;
  consultation_type: string;
  consulting_for: string;
  scheduled_date: DateRange;
  appointment_date: string;
  visible_date: string;
  allergies: string[];
  current_medications: string[];
  reason: string;
  attachments: Attachment[];
  description: string;
  amount: number;
  status: APPOINTMENT_STATUS;
  payment: Payment;
  patientData?: User;
};

declare type Payment = {
  paymentId: string;
  appointmentId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: PAYMENT_STATUS;
  created: number;
  doctorId: string;
  patientId: string;
};

declare type Attachment = {
  name: string;
  url: string;
  mimeType: string;
  size: string;
};

declare type ConversationMetaData = {
  doctorName: string;
  patientName: string;
  doctorProfilePicture: string;
  patientProfilePicture: string;
};

declare interface Conversation {
  conversationId: string;
  doctorId: string;
  patientId: string;
  patappointmentId: string;
  lastMessageAt: string;
  lastMessage: string;
  lastMessageRead: boolean;
  lastMessageId: string;
  ttl: string;
  note: string;
  messages: Message[];
  metaData: ConversationMetaData;
}

declare interface Message {
  senderId: string;
  conversationId: string;
  senderRole: string;
  messageId: string;
  text?: string;
  recipientUserId: string;
  sentAt: number;
  attachments: Attachment[];
  isRead: boolean;
  ttl: string;
}

declare interface authState {
  user: User;
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
}

declare interface doctorState {
  allDoctors: User[];
  fetchedDoctor: User | null;
  loading: boolean;
  error: string | null | undefined;
}

declare interface paymentState {
  allPayments: Payment[];
  fetchedPayment: Payment | null;
  loading: boolean;
  error: string | null | undefined;
}

declare interface appointmentState {
  allAppointments: Appointment[];
  fetchedAppointment: Appointment | null;
  loading: boolean;
  error: string | null | undefined;
  lastEvaluatedKey: string | null;
}

declare interface notificationState {
  allNotifications: Notification[];
  fetchedNotification: Notification | null;
  loading: boolean;
  error: string | null | undefined;
  lastEvaluatedKey: string | null;
}
declare interface conversationState {
  allConversations: Conversation[];
  fetchedConversation: Conversation | null;
  Cloading: boolean;
  Mloading: boolean;
  error: string | null | undefined;
  ClastEvaluatedKey: string | null;
  MlastEvaluatedKey: string | null;
}

declare interface Notification {
  notificationId: string;
  userId: string;
  message: string;
  status: "unread" | "read";
  timestamp: number;
  link?: string;
}
