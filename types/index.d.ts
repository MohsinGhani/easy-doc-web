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
  name: string;
  specialty: string;
  experience: string;
  location: string;
  rating: number;
  available: boolean;
  fee: number;
  imageUrl: string;
}