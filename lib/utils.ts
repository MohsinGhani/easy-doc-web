import { type ClassValue, clsx } from "clsx";
import { addMinutes, differenceInMinutes, format, parse } from "date-fns";
import { twMerge } from "tailwind-merge";
import cities from "@/public/data/groupedCities.json";
import services from "@/public/data/services.json";
import { COUNTRIES } from "@/constants";
import createApiClient from "@/helpers/createApiClient";
import { ApiServiceName, getServiceUrl } from "@/helpers/getServiceUrl";

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

interface RatingsData {
  overallRating: number;
  ratingsBreakdownPercentages: { [key: number]: number };
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

export const capitalizeWords = (string: string) => {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getCountryNameByCode = (code: string) => {
  return COUNTRIES.find((country) => country.value === code)?.label || "";
};

export const getCityNameById = (cityId: string) => {
  return (
    Object.values(typedCities)
      .flat()
      .find((city) => city.id === cityId)?.name || ""
  );
};

export const formatTimeForReviews = (date: Date | string) => {
  const parsedDate =
    typeof date === "string"
      ? parse(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", new Date())
      : date;
  return format(parsedDate, "MMMM d, yyyy 'at' h:mm aa");
};

export const calculateRatingsData = (reviews: Review[]): RatingsData => {
  // Calculate the overall rating dynamically from reviews
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  const totalReviews = reviews.length;
  const overallRating =
    totalReviews > 0 ? parseFloat((totalRating / totalReviews).toFixed(1)) : 0;

  // Calculate the ratings breakdown based on the reviews
  const ratingsBreakdown = reviews.reduce(
    (acc: { [key: number]: number }, review) => {
      acc[review.rating] += 1; // Increment the count for the corresponding rating
      return acc;
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } // Initial value with all counts set to 0
  );

  // Convert counts to percentages if there are any reviews
  const ratingsBreakdownPercentages = totalReviews
    ? Object.keys(ratingsBreakdown).reduce(
        (acc: { [key: number]: number }, rating) => {
          acc[Number(rating)] =
            (ratingsBreakdown[Number(rating)] / totalReviews) * 100;
          return acc;
        },
        { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      )
    : { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  return {
    overallRating,
    ratingsBreakdownPercentages,
  };
};

export const calculateAverageFee = (services: Service[]): number => {
  if (services.length === 0) return 0;

  const totalFee = services.reduce((sum, service) => {
    const fee = parseFloat(service.fee.replace(/[^0-9.]/g, ""));
    return sum + (isNaN(fee) ? 0 : fee);
  }, 0);

  const averageFee = totalFee / services.length;
  return averageFee;
};

export const functionsApiClient = createApiClient(
  getServiceUrl(ApiServiceName.FUNCTIONS) || ""
);

export const appointmentsApiClient = createApiClient(
  getServiceUrl(ApiServiceName.APPOINTMENTS) || ""
);
