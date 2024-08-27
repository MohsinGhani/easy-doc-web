"use client";

import { ContentLayout } from "@/components/layout/content-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import UpcomingAppointmentsList from "@/components/doctor/UpcomingAppointmentsList";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";

const AppointmentsPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = () => setIsMobile(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleResize);
    handleResize();

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <ContentLayout title="Appointments">
      <Card>
        <CardContent>
          <Tabs defaultValue="upcoming">
            <TabsList className="mb-6 mt-2 w-full" defaultValue="upcoming">
              {!isMobile ? (
                <>
                  {["upcoming", "cancelled", "completed"].map((value, i) => (
                    <TabsTrigger
                      value={value}
                      className="flex-1 capitalize p-1"
                      key={i}
                    >
                      <span className="text-xs rounded-lg bg-stone-50 px-2 py-1 text-[#71717a] ml-2">
                        {value}
                      </span>
                    </TabsTrigger>
                  ))}
                </>
              ) : (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center justify-between w-full px-2 py-2">
                      Select by status <ChevronDownIcon />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-96">
                      {["upcoming", "cancelled", "completed"].map(
                        (value, i) => (
                          <DropdownMenuItem key={i} className="!w-full">
                            <TabsTrigger
                              value={value}
                              className="flex-1 capitalize p-1"
                            >
                              <span className="text-xs rounded-lg bg-stone-50 px-2 py-1 text-[#71717a] ml-2">
                                {value}
                              </span>
                            </TabsTrigger>
                          </DropdownMenuItem>
                        )
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </TabsList>

            <TabsContent value="upcoming">
              <UpcomingAppointmentsList />
            </TabsContent>
            <TabsContent value="cancelled">Cancelled</TabsContent>
            <TabsContent value="completed">Completed</TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </ContentLayout>
  );
};

export default AppointmentsPage;
