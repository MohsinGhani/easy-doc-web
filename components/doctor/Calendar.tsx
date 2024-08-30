import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { addMonths, format } from "date-fns";
import { cn } from "@/lib/utils";

interface CalendarProps {
  selectedDay: string;
  onDaySelect: (day: string) => void;
  onMonthChange: (month: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  selectedDay,
  onDaySelect,
  onMonthChange,
}) => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const initialMonth = new Date();

  const handleSelect = (value: string) => {
    onMonthChange(value);
  };

  return (
    <div className="w-full">
      <Select
        onValueChange={handleSelect}
        defaultValue={format(initialMonth, "yyyy-MM-dd")}
      >
        <SelectTrigger className="w-fit border-none font-bold my-6 shadow-none justify-start">
          <SelectValue>{format(initialMonth, "MMMM yyyy")}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 12 }, (_, i) => {
            const monthDate = addMonths(initialMonth, i);
            return (
              <SelectItem key={i} value={format(monthDate, "yyyy-MM-dd")}>
                {format(monthDate, "MMMM yyyy")}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      <div className="xl:hidden lg:block hidden">
        <Select onValueChange={onDaySelect} defaultValue={selectedDay}>
          <SelectTrigger className="w-full mt-4">
            <SelectValue>{selectedDay}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {daysOfWeek.map((day) => (
              <SelectItem key={day} value={day}>
                {day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full xl:flex lg:hidden flex justify-between items-center">
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-col items-center cursor-pointer p-2 rounded-lg relative",
              {
                "bg-blue-50": selectedDay === day,
              }
            )}
            onClick={() => onDaySelect(day)}
          >
            <span
              className={cn(
                "text-xs font-normal",
                selectedDay === day
                  ? "text-blue-500 font-medium"
                  : "text-zinc-600"
              )}
            >
              {day}
            </span>
            <span
              className={cn(
                "mt-2 text-base font-bold",
                selectedDay === day ? "text-blue-500" : "text-neutral-900"
              )}
            >
              {Math.floor(Math.random() * 10) + index * 3}
            </span>
            {selectedDay === day && (
              <div className="mt-1 w-1 h-1 bg-emerald-300 rounded-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
