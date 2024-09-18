"use client";

import { ContentLayout } from "@/components/layout/content-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import TabListContent from "@/components/doctor/TabListContent";

const weekdays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const AvailableTimingsPage = () => {
  return (
    <ContentLayout title="Available Timings">
      <Card>
        <CardContent className="sm:p-6 p-4">
          <h2 className="text-xl font-medium mb-5">Select Available Slots </h2>
          <Separator className="my-6" />
          <Tabs defaultValue="monday" className="w-full">
            <h2 className="text-sm font-medium">Select Available Days</h2>
            <TabsList
              className="mb-6 mt-2 w-full hidden md:inline-flex"
              defaultValue="monday"
            >
              {weekdays.map((day, i) => (
                <TabsTrigger
                  value={day}
                  className="flex-1 capitalize p-1"
                  key={i}
                >
                  {day}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsList
              className="mb-6 mt-2 w-full md:hidden"
              defaultValue="monday"
            >
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center justify-between w-full px-2 py-2">
                  Select a day <ChevronDownIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="!w-full">
                  {weekdays.map((day, i) => (
                    <DropdownMenuItem key={i} className="!w-full">
                      <TabsTrigger
                        value={day}
                        className="flex-1 capitalize p-1"
                      >
                        {day}
                      </TabsTrigger>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TabsList>

            <CardContent>
              {weekdays.map((day, dayIndex) => (
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
