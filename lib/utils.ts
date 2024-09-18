import { COUNTRIES } from "@/constants";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import cities from "@/public/data/groupedCities.json";

interface Cities {
  [key: string]: City[];
}

const typedCities: Cities = cities as Cities;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCitiesByCountry = (countryCode: string): City[] => {
  return typedCities[countryCode] || [];
};
