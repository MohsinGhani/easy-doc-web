"use client";

import { useFormContext } from "react-hook-form";
import React, { useEffect, useState } from "react";
import CustomFormField, { FormFieldType } from "../auth/CustomFormField";
import { WEEK_DAYS } from "@/constants";
import {
  getDayName,
  getUpdatedDaysWithDates,
  removeDaySuffix,
} from "@/lib/utils";
import { format, startOfToday } from "date-fns";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AvailableTimingsTabsContent from "./AvailableTimingsTabsContent";

const AvailableTimingsTabs = () => {
  const { setValue, watch, control } = useFormContext();
  const today = startOfToday();
  const appointment_date = watch("appointment_date");

  const [activeTab, setActiveTab] = useState<string>(
    format(today, "EEEE").toLowerCase()
  );
  const [sortedDaysWithDates, setSortedDaysWithDates] = useState(() =>
    getUpdatedDaysWithDates(today, WEEK_DAYS)
  );

  useEffect(() => {
    if (!appointment_date) return;

    const dayName = getDayName(appointment_date);
    if (dayName === "Invalid Date") return;

    if (dayName === activeTab) return;
    setActiveTab(dayName);

    const appointmentDate = new Date(removeDaySuffix(appointment_date));
    if (isNaN(appointmentDate.getTime())) return;

    const startDayIndex = WEEK_DAYS.indexOf(dayName);
    const sortedDays = [
      ...WEEK_DAYS.slice(startDayIndex),
      ...WEEK_DAYS.slice(0, startDayIndex),
    ];
    const updatedDays = getUpdatedDaysWithDates(appointmentDate, sortedDays);
    setSortedDaysWithDates(updatedDays);
  }, [appointment_date]);

  useEffect(() => {
    if (!activeTab) return;

    const presentTab = sortedDaysWithDates.find((day) => day.day === activeTab);
    if (!presentTab) return;

    const dayName = getDayName(appointment_date);
    if (dayName === "Invalid Date") return;
    if (dayName === presentTab?.day) return;

    const newValueToBeSet = format(
      new Date(removeDaySuffix(presentTab.date)),
      "d MMM yyyy"
    );

    if (!newValueToBeSet || newValueToBeSet === "Invalid Date") return;

    setValue("appointment_date", newValueToBeSet);
  }, [activeTab]);

  const renderTabs = () => {
    return sortedDaysWithDates.map(({ day, date }, i) => (
      <TabsTrigger
        key={day}
        value={day}
        className={`flex-1 capitalize py-2 px-2 text-center text-sm md:text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground cursor-pointer pl-1`}
        onClick={() => setActiveTab(day)}
        disabled={new Date(removeDaySuffix(date)) < today}
      >
        <div className="space-y-2">
          <span className="capitalize">
            <span className="md:hidden inline"> {day.slice(0, 3)}</span>
            <span className="hidden md:inline">{day}</span>
          </span>
          <br />
          <span className="text-xs text-black">{date}</span>
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
          <div className="md:hidden @xs:w-auto">
            <TabsList className="w-full h-16">
              <Carousel className="w-[100vw] max-w-[65%] mx-auto">
                <CarouselContent>{renderTabs()}</CarouselContent>
                <CarouselPrevious type="button" />
                <CarouselNext type="button" />
              </Carousel>
            </TabsList>
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
