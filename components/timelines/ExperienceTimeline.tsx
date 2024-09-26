import { Dot } from "lucide-react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

interface ExperienceTimelineProps {
  experiences: Experience[];
}

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
  experiences,
}) => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Practice Experiences:</h2>
      <VerticalTimeline layout="1-column-left" lineColor="#4d77ff" animate>
        {experiences.map((exp, index) => (
          <VerticalTimelineElement
            key={index}
            visible
            className="vertical-timeline-element--work"
            contentStyle={{
              borderRadius: "8px",
              padding: "20px",
            }}
            date={exp.time_period}
            iconStyle={{
              background: "#4d77ff",
              boxShadow: "none",
            }}
            icon={<Dot className="stroke-[15px] text-white" />}
          >
            <h3 className="vertical-timeline-element-title text-lg font-bold">
              {exp.title}
            </h3>
            <h4 className="vertical-timeline-element-subtitle text-md font-semibold text-gray-500">
              {exp.hospital_name} - {exp.employment}
            </h4>
            <p className="text-sm text-gray-600">{exp.city}</p>
            <p className="text-sm">{exp.description}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default ExperienceTimeline;
