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
  startTime: string;
  endTime: string;
};

declare type Doctor = {
  userId: number;
  given_name: string;
  family_name: string;
  display_name: string;
  profile_image: string;
  bio: string;
  years_of_experience: string;
  city: string;
  country: string;
  specialty: string;
  location: string;
  rating: number;
  available: boolean;
  verified: boolean;
  fee: number;
  experiences: Experience[];
  awards: Award[];
  education: Education[];
  availableDays: AvailableDay[];
  reviews: Review[];
};

declare interface Experience {
  title: string;
  description: string;
  employment_type: string;
  hospital_name: string;
  city: string;
  country: string;
  currently_working: boolean;
  time_period: string;
  [key: string]: string | undefined;
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
};
