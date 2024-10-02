import { type ClassValue, clsx } from "clsx";
import {
  addDays,
  addMinutes,
  differenceInMinutes,
  format,
  parse,
} from "date-fns";
import { twMerge } from "tailwind-merge";
import cities from "@/public/data/groupedCities.json";
import services from "@/public/data/services.json";
import { COUNTRIES } from "@/constants";
import createApiClient from "@/helpers/createApiClient";
import { ApiServiceName, getServiceUrl } from "@/helpers/getServiceUrl";
import { FileItem } from "@/components/appointment/FileUploadComponent";
import axios from "axios";

export interface RatingsData {
  overallRating: number;
  totalReviews: number;
  ratingsBreakdownPercentages: { [key: number]: number };
}

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

interface UploadedFile {
  name: string;
  url: string;
  mimeType: string;
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
export const formatTimeForUI = (time: string | Date) =>
  typeof time === "string"
    ? format(parseTime(time), "hh:mm aa")
    : format(time, "hh:mm aa");

export const removeDaySuffix = (dateString: string) => {
  return dateString.replace(/(\d+)(st|nd|rd|th)/, "$1").trim();
};

export const addDaySuffix = (date: number) => {
  if (date > 3 && date < 21) return `${date}th`;
  switch (date % 10) {
    case 1:
      return `${date}st`;
    case 2:
      return `${date}nd`;
    case 3:
      return `${date}rd`;
    default:
      return `${date}th`;
  }
};

export const getUpdatedDaysWithDates = (
  startDate: Date,
  sortedDays: string[]
) => {
  return sortedDays.map((day, index) => {
    const updatedDate = addDays(startDate, index); // Increment date based on index
    return {
      day,
      date: `${addDaySuffix(updatedDate.getDate())} ${format(
        updatedDate,
        "MMM yyyy"
      )}`,
    };
  });
};

export const getDayName = (dateString: string) => {
  const cleanedDate = removeDaySuffix(dateString);
  const date = new Date(cleanedDate);
  if (isNaN(date.getTime())) return "Invalid Date";
  return format(date, "EEEE").toLowerCase();
};

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
export const paymentsApiClient = createApiClient(
  getServiceUrl(ApiServiceName.PAYMENTS) || ""
);
export const appointmentsApiClient = createApiClient(
  getServiceUrl(ApiServiceName.APPOINTMENTS) || ""
);
export const notificationsApiClient = createApiClient(
  getServiceUrl(ApiServiceName.NOTIFICATIONS) || ""
);
export const meetingsApiClient = createApiClient(
  getServiceUrl(ApiServiceName.NOTIFICATIONS) || ""
);

/**
 * Helper function to generate presigned URLs and upload files to S3.
 *
 * @param files - Array of files to be uploaded.
 * @returns Array of objects containing the file name, uploaded URL, and mimeType.
 */
export const uploadFilesToS3 = async (
  files: FileItem[]
): Promise<UploadedFile[]> => {
  const uploadedFiles: UploadedFile[] = [];

  for (const file of files) {
    try {
      // Step 1: Generate presigned URL
      const { data } = await appointmentsApiClient.post(
        "/generate-presigned-url",
        {
          fileName: file.name,
          fileType: file.type,
        }
      );

      const presignedUrl = data.data;

      // Step 2: Upload file to S3 using the presigned URL
      await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      // Store the uploaded file details
      uploadedFiles.push({
        name: file.name,
        url: presignedUrl.split("?")[0], // Remove query parameters from URL
        mimeType: file.type,
      });
    } catch (error) {
      console.error(`Failed to upload file: ${file.name}`, error);
      throw new Error(`Failed to upload file: ${file.name}`);
    }
  }

  return uploadedFiles;
};

export const calculateUpdatedRatings = (
  newRating: number,
  currentOverallRating: number,
  currentTotalReviews: number,
  currentRatingsBreakdownPercentages: { [key: number]: number }
): RatingsData => {
  // Increment total reviews
  const totalReviews = currentTotalReviews + 1;

  // Calculate new overall rating
  const totalRatingSum = currentOverallRating * currentTotalReviews + newRating;
  const overallRating = parseFloat((totalRatingSum / totalReviews).toFixed(1));

  // Convert percentages back to counts
  const ratingsBreakdownCounts: { [key: number]: number } = {
    1: (currentRatingsBreakdownPercentages[1] / 100) * currentTotalReviews,
    2: (currentRatingsBreakdownPercentages[2] / 100) * currentTotalReviews,
    3: (currentRatingsBreakdownPercentages[3] / 100) * currentTotalReviews,
    4: (currentRatingsBreakdownPercentages[4] / 100) * currentTotalReviews,
    5: (currentRatingsBreakdownPercentages[5] / 100) * currentTotalReviews,
  };

  // Increment the count for the new rating
  ratingsBreakdownCounts[newRating] += 1;

  // Convert counts back to percentages
  const ratingsBreakdownPercentages = Object.keys(
    ratingsBreakdownCounts
  ).reduce(
    (acc: { [key: number]: number }, rating) => {
      acc[Number(rating)] = parseFloat(
        ((ratingsBreakdownCounts[Number(rating)] / totalReviews) * 100).toFixed(
          2
        )
      );
      return acc;
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  );

  // Return updated RatingsData
  return {
    overallRating,
    totalReviews,
    ratingsBreakdownPercentages,
  };
};
