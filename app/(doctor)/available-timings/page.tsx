"use client";

import { ContentLayout } from "@/components/layout/content-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import TabListContent from "@/components/doctor/TabListContent";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { WEEK_DAYS } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Easy Doc | Available Timings",
  description: "Set your available timings",
};

const AvailableTimingsPage = () => {
  return (
    <ContentLayout title="Available Timings">
      <Card>
        <CardContent className="sm:p-6 p-4">
          <h2 className="text-xl font-medium mb-5">Select Available Slots </h2>
          <Separator className="my-6" />
          <Tabs defaultValue="monday" className="w-full">
            <h2 className="text-sm font-medium">Select Available Days</h2>
            <TabsList className="md:hidden w-full mb-6 mt-2">
              <Carousel className="w-full sm:max-w-[80%] max-w-[65%]">
                <CarouselContent className="w-full">
                  {WEEK_DAYS.map((day, i) => (
                    <CarouselItem
                      key={i}
                      className="basis-1/4 min-w-[130px] max-w-[130px]"
                    >
                      <TabsTrigger
                        value={day}
                        className="w-full capitalize p-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        {day}
                      </TabsTrigger>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </TabsList>

            <TabsList className="hidden md:flex w-full justify-between bg-background mb-6 mt-2">
              {WEEK_DAYS.map((day, i) => (
                <TabsTrigger
                  key={i}
                  value={day}
                  className="flex-1 capitalize p-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {day}
                </TabsTrigger>
              ))}
            </TabsList>

            <CardContent>
              {WEEK_DAYS.map((day, dayIndex) => (
                <TabListContent day={day} dayIndex={dayIndex} key={dayIndex} />
              ))}
            </CardContent>
          </Tabs>
        </CardContent>
      </Card>
    </ContentLayout>
  );
};

export default AvailableTimingsPage;
