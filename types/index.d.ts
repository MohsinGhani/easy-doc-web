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
