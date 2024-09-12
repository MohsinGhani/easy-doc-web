declare type weekDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

declare type Gender = "male" | "female" | "other" | "N/D";

declare type AvailableDay = {
  day: weekDay;
  slots: AvailableSlot[];
};

declare type AvailableSlot = {
  startTime: string;
  endTime: string;
};

declare type EMPLOYEMENT_TYPE = "fulltime" | "parttime" | "contract";

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
}

declare interface Award {
  award_name: string;
  description: string;
  institute: string;
  location: string;
  year: string;
  [key: string]: string | undefined;
}

declare interface Education {
  degree_name: string;
  field: string;
  description: string;
  institute: string;
  time_period: string;
  city: string;
  country: string;
  [key: string]: string | undefined;
}

declare interface Review {
  name: string;
  date: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
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
