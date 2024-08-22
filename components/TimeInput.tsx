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
  const [hours, minutes] = value.split(":");
  const period = parseInt(hours) >= 12 ? "PM" : "AM";
  const displayHours = parseInt(hours) % 12 || 12;

  const handleHourChange = (newHours: string) => {
    const h = parseInt(newHours);
    if (h >= 1 && h <= 12) {
      const newValue = `${period === "PM" ? (h % 12) + 12 : h % 12}:${minutes}`;
      onChange(newValue.padStart(5, "0"));
    }
  };

  const handleMinuteChange = (newMinutes: string) => {
    const m = parseInt(newMinutes);
    if (m === 0 || m === 30) {
      onChange(`${hours}:${newMinutes.padStart(2, "0")}`);
    }
  };

  const handlePeriodChange = (newPeriod: string) => {
    const h = parseInt(hours);
    const newHours = newPeriod === "PM" ? (h % 12) + 12 : h % 12;
    onChange(`${newHours.toString().padStart(2, "0")}:${minutes}`);
  };

  return (
    <div className="flex items-center space-x-2">
      <Input
        id={`${id}-hours`}
        type="number"
        min={1}
        max={12}
        value={displayHours}
        onChange={(e) => handleHourChange(e.target.value)}
        className="w-14"
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
