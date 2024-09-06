import { Dot } from "lucide-react";
import React from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";

interface TimelineElementProps {
  element: {
    title: string | undefined;
    subtitle: string | undefined;
    location: string | undefined;
    description: string | undefined;
    date: string | undefined;
  };
}

const TimelineElement: React.FC<TimelineElementProps> = ({ element }) => {
  return (
    <VerticalTimelineElement
      visible
      className="vertical-timeline-element--work"
      contentStyle={{
        borderRadius: "8px",
        padding: "20px",
      }}
      date={element.date || "No Date Provided"}
      iconStyle={{
        background: "#4d77ff",
        boxShadow: "none",
      }}
      icon={<Dot className="stroke-[15px] text-white" />}
    >
      <h3 className="vertical-timeline-element-title text-lg font-bold">
        {element.title || "No Title Available"}
      </h3>
      <h4 className="vertical-timeline-element-subtitle text-md font-semibold text-gray-500">
        {element.subtitle || "No Subtitle"}
      </h4>
      <p className="text-sm text-gray-600">
        {element.location || "No Location Provided"}
      </p>
      <p className="text-sm">
        {element.description || "No Description Available"}
      </p>
    </VerticalTimelineElement>
  );
};

export default TimelineElement;
