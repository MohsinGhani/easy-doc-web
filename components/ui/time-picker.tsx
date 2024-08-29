import React from "react";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Label } from "./label";

interface TimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  label: string;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  label,
}) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const handleHourChange = (hour: string) => {
    const newDate = new Date(value);
    newDate.setHours(parseInt(hour));
    onChange(newDate);
  };

  const handleMinuteChange = (minute: string) => {
    const newDate = new Date(value);
    newDate.setMinutes(parseInt(minute));
    onChange(newDate);
  };

  return (
    <div>
      <Label className="" id={label}>
        {label}
      </Label>
      <div className="flex">
        <Select
          value={value.getHours().toString()}
          onValueChange={handleHourChange}
        >
          <SelectTrigger id="hour">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {hours.map((hour) => (
              <SelectItem key={hour} value={hour.toString()}>
                {(hour + 1).toString().padStart(2, "0")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={value.getMinutes().toString()}
          onValueChange={handleMinuteChange}
        >
          <SelectTrigger id="minute">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {minutes.map((minute) => (
              <SelectItem key={minute} value={minute.toString()}>
                {(minute + 1).toString().padStart(2, "0")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
