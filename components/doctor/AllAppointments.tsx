"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import UpcomingAppointmentsList from "@/components/doctor/UpcomingAppointmentsList";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CancelledAppointmentsList from "./CancelledAppointmentsList";
import CompletedAppointmentsList from "./CompletedAppointmentsList";

const AllAppointments = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setActiveTab(searchParams.get("activeTab") || "upcoming");
  }, [searchParams]);

  const navigateToTab = (newActiveTab: string) => {
    // Get the current query parameters
    const currentParams = new URLSearchParams(searchParams);
    // Update the 'activeTab' parameter
    currentParams.set("activeTab", newActiveTab);

    router.replace(`/appointments/?${currentParams.toString()}`, {
      scroll: false,
    });
  };

  return (
    <Card>
      <CardContent>
        <Tabs defaultValue={activeTab}>
          <TabsList className="md:hidden w-full mb-6 mt-2">
            <Carousel className="w-full max-w-[80%]">
              <CarouselContent className="w-full">
                {["upcoming", "cancelled", "completed"].map((value, i) => (
                  <CarouselItem key={i} className="basis-1/3 min-w-[150px]">
                    <TabsTrigger
                      value={value}
                      className="w-full capitalize p-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      onClick={() => navigateToTab(value)}
                    >
                      {value}
                      <span className="text-xs rounded-lg bg-stone-50 px-2 py-1 text-[#71717a] ml-2">
                        {Math.floor(Math.random() * 100) + 1}
                      </span>
                    </TabsTrigger>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </TabsList>

          <TabsList
            className="hidden md:flex w-full justify-between bg-background mb-6 mt-2"
            defaultValue="upcoming"
          >
            {["upcoming", "cancelled", "completed"].map((value, i) => (
              <TabsTrigger
                key={i}
                value={value}
                className="flex-1 capitalize p-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                onClick={() => navigateToTab(value)}
              >
                {value}
                <span className="text-xs rounded-lg bg-stone-50 px-2 py-1 text-[#71717a] ml-2">
                  {Math.floor(Math.random() * 100) + 1}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="upcoming">
            <UpcomingAppointmentsList />
          </TabsContent>
          <TabsContent value="cancelled">
            <CancelledAppointmentsList />
          </TabsContent>
          <TabsContent value="completed">
            <CompletedAppointmentsList />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AllAppointments;