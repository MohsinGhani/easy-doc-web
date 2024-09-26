import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import TimelineElement from "./TimelineElement";
import {
  capitalizeWords,
  getCityNameById,
  getCountryNameByCode,
} from "@/lib/utils";

// Generic interface for TimelineComponent
interface TimelineComponentProps<T> {
  heading: string;
  titleKey: keyof T | (keyof T)[];
  subTitleKeys: keyof T | (keyof T)[];
  descriptionKey?: keyof T | (keyof T)[];
  locationKey?: keyof T | (keyof T)[];
  dateKey?: keyof T | (keyof T)[];
  separators?: { [key: string]: string };
  elements: T[];
}

const TimelineComponent = <T extends { [key: string]: any }>({
  heading,
  elements,
  titleKey,
  subTitleKeys,
  locationKey,
  descriptionKey,
  dateKey,
  separators = {},
}: TimelineComponentProps<T>) => {
  if (!elements || !elements.length) return <div className="min-h-96">No elements found.</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">{heading}</h2>
      <VerticalTimeline layout="1-column-left" lineColor="#4d77ff" animate>
        {elements.map((elem, index) => {
          const element = {
            title: getKeyValue(elem, titleKey, separators.titleKey || " - "),
            subtitle: getKeyValue(
              elem,
              subTitleKeys,
              separators.subTitleKeys || " - "
            ),
            location: locationKey
              ? getKeyValue(elem, locationKey, separators.locationKey || " - ")
              : "",
            description: descriptionKey
              ? getKeyValue(
                  elem,
                  descriptionKey,
                  separators.descriptionKey || " - "
                )
              : "",
            date: dateKey
              ? getKeyValue(elem, dateKey, separators.dateKey || " - ")
              : "",
          };

          return <TimelineElement element={element} key={index} />;
        })}
      </VerticalTimeline>
    </div>
  );
};

const getKeyValue = <T extends { [key: string]: any }>(
  elem: T,
  key: keyof T | (keyof T)[],
  separator: string
): string => {
  if (Array.isArray(key)) {
    return capitalizeWords(
      key
        .map((k) => {
          const value = elem[k];
          // Check if the key is either 'city' or 'country' and handle accordingly
          if (k === "city" && typeof value === "string") {
            return getCityNameById(value) || value; // Return city name or fallback to ID
          } else if (k === "country" && typeof value === "string") {
            return getCountryNameByCode(value) || value; // Return country name or fallback to code
          }
          return value;
        })
        .filter(Boolean)
        .join(separator)
    );
  }

  // Single key case
  const value = elem[key];
  if (key === "city" && typeof value === "string") {
    return capitalizeWords(getCityNameById(value) || value); // Return city name or fallback to ID
  } else if (key === "country" && typeof value === "string") {
    return capitalizeWords(getCountryNameByCode(value) || value); // Return country name or fallback to code
  }

  return capitalizeWords(value || "");
};

export default TimelineComponent;
