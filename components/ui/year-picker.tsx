"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface YearPickerProps {
  value: string | number | undefined;
  onChange: (year: string) => void;
  disabled?: boolean;
  fromYear?: number;
  toYear?: number;
}

const YearPicker: React.FC<YearPickerProps> = ({
  value,
  onChange,
  disabled = false,
  fromYear,
  toYear,
}) => {
  const currentYear = new Date().getFullYear();
  const startYear = fromYear || currentYear - 50;
  const endYear = toYear || currentYear;

  const years: number[] = [];
  for (let year = endYear; year >= startYear; year--) {
    years.push(year);
  }

  return (
    <div>
      <Select
        value={value?.toString()}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Year" />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default YearPicker;
