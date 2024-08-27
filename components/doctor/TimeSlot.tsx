import React, { useState } from "react";
import { Clock3, X } from "lucide-react";
import DeleteDialog from "../DeleteDialog";

const TimeSlot = ({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative flex items-center p-2 gap-1 border rounded-md font-semibold transition-all duration-300 ${
        isHovered ? "" : "bg-secondary border-stone-600/30"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Clock3 className="w-3.5 h-3" />
      <p className={`text-sm transition-all duration-300`}>
        {`${startTime} - ${endTime}`}
      </p>

      {isHovered && (
        <DeleteDialog
          trigger={
            <div className="absolute inset-y-0 right-0 flex items-center justify-center w-8 h-full bg-red-500 rounded-r-md cursor-pointer">
              <X className="w-4 h-4 text-white" />
            </div>
          }
          text="Your this slot will be deleted"
          onReject={() => {
            console.log("deleted");
          }}
        />
      )}
    </div>
  );
};

export default TimeSlot;
