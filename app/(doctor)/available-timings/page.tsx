"use client";

import { ContentLayout } from "@/components/layout/content-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { AddTimeSlotDialog } from "@/components/AddTimeSlotDialog";
import { useAppSelector } from "@/lib/hooks";
import TimeSlot from "@/components/doctor/TimeSlot";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";

const AvailableTimingsPage = () => {
  const availableDays = useAppSelector(
    (state) => state.availability.availableDays
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = () => setIsMobile(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleResize);
    handleResize();

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <ContentLayout title="Available Timings">
      <Card>
        <CardContent className="sm:p-6 p-4">
          <h2 className="text-xl font-medium mb-5">Select Available Slots </h2>

          <Separator className="my-6" />

          <Tabs defaultValue="monday" className="w-full">
            <h2 className="text-sm font-medium">Select Available Days</h2>
            <TabsList className="mb-6 mt-2 w-full" defaultValue="monday">
              {!isMobile ? (
                <>
                  {availableDays.map((value, i) => (
                    <TabsTrigger
                      value={value.day}
                      className="flex-1 capitalize p-1"
                      key={i}
                    >
                      {value.day}
                    </TabsTrigger>
                  ))}
                </>
              ) : (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center justify-between w-full px-2 py-2">
                      Select a day <ChevronDownIcon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="!w-full">
                      {availableDays.map((value, i) => (
                        <DropdownMenuItem key={i} className="!w-full">
                          <TabsTrigger
                            value={value.day}
                            className="flex-1 capitalize p-1"
                          >
                            {value.day}
                          </TabsTrigger>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </TabsList>

            <CardContent>
              {availableDays.map((value, i) => (
                <TabsContent value={value.day} key={i}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-medium capitalize">
                      {value.day}
                    </h3>

                    <AddTimeSlotDialog day={value.day} />
                  </div>
                  <Separator className="my-6" />

                  <div className="flex items-center gap-2">
                    {value.slots.map(({ startTime, endTime }, i) => (
                      <TimeSlot
                        startTime={startTime}
                        endTime={endTime}
                        key={i}
                      />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </CardContent>
          </Tabs>
        </CardContent>
      </Card>
    </ContentLayout>
  );
};

export default AvailableTimingsPage;
