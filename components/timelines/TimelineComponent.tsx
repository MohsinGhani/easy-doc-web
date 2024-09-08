import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import TimelineElement from "./TimelineElement";

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
  if (!elements || !elements.length) return <div>No elements found.</div>;

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
    return key
      .map((k) => elem[k])
      .filter(Boolean)
      .join(separator);
  }
  return elem[key] || "";
};

export default TimelineComponent;
