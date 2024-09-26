"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimeInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export function TimeInput({ id, value, onChange }: TimeInputProps) {
  const [hours, minutes] = value?.split(":");
  const numericHours = parseInt(hours);
  const period = numericHours >= 12 ? "PM" : "AM";
  const displayHours = numericHours % 12 || 12;

  const handleHourChange = (newHours: string) => {
    let h = parseInt(newHours);
    if (h >= 1 && h <= 12) {
      if (period === "PM" && h !== 12) h += 12;
      if (period === "AM" && h === 12) h = 0; // Handle 12 AM as 00:XX
      const newValue = `${h.toString().padStart(2, "0")}:${minutes}`;
      onChange(newValue);
    }
  };

  const handleMinuteChange = (newMinutes: string) => {
    const m = parseInt(newMinutes);
    if (m === 0 || m === 30) {
      const newValue = `${hours}:${m.toString().padStart(2, "0")}`;
      onChange(newValue);
    }
  };

  const handlePeriodChange = (newPeriod: string) => {
    let h = parseInt(hours);
    if (newPeriod === "PM" && h < 12) {
      h += 12;
    } else if (newPeriod === "AM" && h >= 12) {
      h -= 12;
    }
    const newValue = `${h.toString().padStart(2, "0")}:${minutes}`;
    onChange(newValue);
  };

  return (
    <div className="flex items-center space-x-2">
      <Input
        id={`${id}-hours`}
        type="number"
        min={1}
        max={12}
        value={displayHours.toString()}
        onChange={(e) => handleHourChange(e.target.value)}
        className="w-20"
      />
      <span>:</span>
      <Select value={minutes} onValueChange={handleMinuteChange}>
        <SelectTrigger className="w-[70px]">
          <SelectValue>{minutes}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="00">00</SelectItem>
          <SelectItem value="30">30</SelectItem>
        </SelectContent>
      </Select>
      <Select value={period} onValueChange={handlePeriodChange}>
        <SelectTrigger className="w-[70px]">
          <SelectValue>{period}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="AM">AM</SelectItem>
          <SelectItem value="PM">PM</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
