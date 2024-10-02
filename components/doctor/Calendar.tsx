import React from "react";
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
  loading: boolean; // Added loading prop to control skeleton rendering
  numberOfAppointments: number;
}

const Calendar: React.FC<CalendarProps> = ({
  selectedDay,
  onDaySelect,
  onMonthChange,
  loading,
  numberOfAppointments,
}) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const initialMonth = new Date();

  const handleSelect = (value: string) => {
    onMonthChange(value);
  };

  if (loading) {
    return (
      <div className="w-full">
        {/* Skeleton for Month Selector */}
        <div className="w-fit my-6">
          <div className="h-6 w-40 bg-gray-300 rounded mb-4"></div>
        </div>

        {/* Skeleton for Days of Week */}
        <div className="w-full xl:flex lg:hidden flex justify-between items-center">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-2 rounded-lg relative animate-pulse"
            >
              <div className="h-4 w-8 bg-gray-300 rounded mb-2"></div>
              <div className="h-6 w-6 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
              {/* TODO: Replace with actual number of appointments */}
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
