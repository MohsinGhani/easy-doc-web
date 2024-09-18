import { type ClassValue, clsx } from "clsx";
import { addMinutes, differenceInMinutes, format, parse } from "date-fns";
import { twMerge } from "tailwind-merge";
import cities from "@/public/data/groupedCities.json";
import services from "@/public/data/services.json";

interface Cities {
  [key: string]: City[];
}

interface JSONService {
  name: string;
  description: string;
  price: number;
  duration: number;
}

interface Services {
  [key: string]: JSONService[];
}

const typedCities: Cities = cities as Cities;
const typedServices: Services = services as Services;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateTimeSlots = (
  startTime: string,
  endTime: string,
  existingSlots: AvailableSlot[]
) => {
  const start = parseTime(startTime);
  const end = parseTime(endTime);

  const slots = [];
  let current = start;

  while (differenceInMinutes(end, current) >= 30) {
    const slotStart = current;
    const slotEnd = addMinutes(current, 30);

    // Check if the new slot overlaps with any existing slots
    const hasOverlap = existingSlots.some((slot) =>
      isOverlapping(
        formatTimeToHHMM(slotStart),
        formatTimeToHHMM(slotEnd),
        slot.start_time,
        slot.end_time
      )
    );

    if (!hasOverlap) {
      slots.push({
        start_time: formatTimeToHHMM(slotStart),
        end_time: formatTimeToHHMM(slotEnd),
      });
    }
    current = slotEnd;
  }

  return slots;
};

export const parseTime = (time: string) => parse(time, "HH:mm", new Date());
export const formatTime = (date: Date) => format(date, "hh:mm aa");
export const formatTimeToHHMM = (date: Date) => format(date, "HH:mm");
export const formatTimeForUI = (time: string) =>
  format(parseTime(time), "hh:mm aa");

export const isOverlapping = (
  start1: string,
  end1: string,
  start2: string,
  end2: string
): boolean => {
  const start1Date = parseTime(start1);
  const end1Date = parseTime(end1);
  const start2Date = parseTime(start2);
  const end2Date = parseTime(end2);

  // Check for both full and partial overlaps
  return (
    (start1Date >= start2Date && start1Date < end2Date) || // Start1 within Slot2
    (end1Date > start2Date && end1Date <= end2Date) || // End1 within Slot2
    (start1Date <= start2Date && end1Date >= end2Date) // Slot1 fully overlaps Slot2
  );
};

export const getOverlappingSlots = (
  existingSlots: AvailableSlot[],
  startTime: string,
  endTime: string
): AvailableSlot[] => {
  return existingSlots.filter((slot) =>
    isOverlapping(slot.start_time, slot.end_time, startTime, endTime)
  );
};

export const getCitiesByCountry = (countryCode: string): City[] => {
  return typedCities[countryCode] || [];
};

export const getServiceBySpeciality = (speciality: string): JSONService[] => {
  return typedServices[speciality] || [];
};
