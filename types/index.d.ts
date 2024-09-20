declare type Gender = "male" | "female" | "other" | "N/D";

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

declare type AvailableSlot = {
  start_time: string;
  end_time: string;
};

declare type EMPLOYEMENT_TYPE = "full_time" | "part_time" | "contract";

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

declare interface Review {
  name: string;
  createdAt: string;
  rating: 1 | 2 | 3 | 4 | 5;
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
  dob: string;
  gender: Gender;
  specialty: string;
  location: string;
  rating: number;
  available: boolean;
  verified: number;
  fee: number;
  languages: string[];
  experiences: Experience[];
  awards: Award[];
  education: Education[];
  availableDays: AvailableDay[];
  reviews: Review[];
  services: Service[];
};

declare type Doctor = {
  userId: string;
  role: string;
  email: string;
  given_name: string;
  family_name: string;
  display_name: string;
  picture: string;
  bio: string;
  years_of_experience: string;
  city: string;
  country: string;
  specialty: string;
  location: string;
  rating: number;
  available: boolean;
  verified: number;
  fee: number;
  experiences: Experience[];
  awards: Award[];
  education: Education[];
  availableDays: AvailableDay[];
  reviews: Review[];
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
