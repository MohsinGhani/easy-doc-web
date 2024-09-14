"use server";

import fs from "fs/promises";
import path from "path";

export const getCitiesByCountry = async (
  countryCode: string
): Promise<City[]> => {
  const filePath = path.join(
    process.cwd(),
    "public",
    "data",
    "groupedCities.json"
  );

  const fileContents = await fs.readFile(filePath, "utf-8");

  const groupedCities = JSON.parse(fileContents);

  return groupedCities[countryCode] || [];
};

// export const getCountryNameWithFlag = async
