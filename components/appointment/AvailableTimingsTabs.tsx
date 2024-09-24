"use client";

import { useFormContext } from "react-hook-form";
import React, { useEffect, useState } from "react";
import CustomFormField, { FormFieldType } from "../auth/CustomFormField";
import { WEEK_DAYS } from "@/constants"; // Adjust the import path as needed
import {
  getDayName,
  getNextDateOfDay,
  getSortedWeekDays,
  removeDaySuffix,
} from "@/lib/utils"; // Adjust the import path as needed
import { addDays, format, startOfToday, getDay } from "date-fns";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AvailableTimingsTabsContent from "./AvailableTimingsTabsContent"; // Adjust the import path as needed

const addDaySuffix = (date: number) => {
  if (date > 3 && date < 21) return `${date}th`;
  switch (date % 10) {
    case 1:
      return `${date}st`;
    case 2:
      return `${date}nd`;
    case 3:
      return `${date}rd`;
    default:
      return `${date}th`;
  }
};

const getSortedDaysWithDates = () => {
  const sortedDays = getSortedWeekDays(); // Get sorted week days starting from today
  const today = startOfToday();
  return sortedDays.map((day) => {
    const nextDate = getNextDateOfDay(day, today);
    return {
      day,
      date: `${addDaySuffix(nextDate.getDate())} ${format(
        nextDate,
        "MMM yyyy"
      )}`,
    };
  });
};

const AvailableTimingsTabs = () => {
  const { setValue, watch, control } = useFormContext();
  const today = startOfToday();

  const appointment_date = watch("appointment_date");
  const [activeTab, setActiveTab] = useState<string>(WEEK_DAYS[0]);
  console.log("🚀 appointment_date:", appointment_date);
  console.log("🚀 activeTab:", activeTab);

  useEffect(() => {
    if (!appointment_date) return;

    const dayName = getDayName(appointment_date);
    if (dayName === "Invalid Date") return;

    if (dayName !== activeTab) {
      setActiveTab(dayName);
    }
  }, [appointment_date]);

  useEffect(() => {
    if (!activeTab) return;

    const currentAppointmentDate = new Date(
      removeDaySuffix(appointment_date || "")
    );

    const isCurrentDateValid =
      !isNaN(currentAppointmentDate.getTime()) &&
      currentAppointmentDate >= today &&
      currentAppointmentDate <= addDays(today, 89);

    if (isCurrentDateValid) {
      const nextDate = getNextDateOfDay(activeTab, today);
      setValue("appointment_date", format(nextDate, "d MMM yyyy"));
    }
  }, [activeTab]);

  const renderTabs = () => {
    const sortedDaysWithDates = getSortedDaysWithDates();
    return sortedDaysWithDates.map(({ day, date }) => (
      <TabsTrigger
        key={day}
        value={day}
        className={`flex-1 capitalize py-2 px-1 text-center text-sm md:text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground`}
        onClick={() => setActiveTab(day)} // Ensure correct tab is selected on click
      >
        <div className="space-y-2">
          {day.charAt(0).toUpperCase() + day.slice(1)} <br />
          <span className="tab-date text-xs text-black">{date}</span>
        </div>
      </TabsTrigger>
    ));
  };

  return (
    <CustomFormField
      name="scheduled_date"
      fieldType={FormFieldType.SKELETON}
      control={control}
      renderSkeleton={(field) => (
        <Tabs
          value={activeTab} // Set the controlled value of the Tabs component
          onValueChange={setActiveTab} // Update activeTab when the tab changes
          className="w-full"
        >
          {/* Mobile View */}
          <div className="md:hidden w-full">
            <div className="max-w-xs mx-auto">
              <TabsList className="w-full h-16">
                <Carousel className="w-full max-w-[65%] mx-auto">
                  <CarouselContent>{renderTabs()}</CarouselContent>
                  <CarouselPrevious type="button" />
                  <CarouselNext type="button" />
                </Carousel>
              </TabsList>
            </div>
          </div>

          {/* Desktop View */}
          <TabsList className="hidden md:flex w-full justify-between bg-background mb-6 mt-2 h-16">
            {renderTabs()}
          </TabsList>

          {/* Tab Content based on Day */}
          {WEEK_DAYS.map((day, dayIndex) => (
            <AvailableTimingsTabsContent
              day={day}
              dayIndex={dayIndex}
              key={dayIndex}
              field={field}
            />
          ))}
        </Tabs>
      )}
    />
  );
};

export default AvailableTimingsTabs;
