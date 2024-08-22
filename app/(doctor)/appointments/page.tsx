import { ContentLayout } from "@/components/layout/content-layout";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import UpcomingAppointmentsList from "@/components/doctor/UpcomingAppointmentsList";

const AppointmentsPage = () => {
  return (
    <ContentLayout title="Appointments">
      <Card>
        <CardContent>
          <Tabs defaultValue="upcoming">
            <TabsList className="my-6 w-full">
              <TabsTrigger value="upcoming" className="flex-1">
                Upcoming{" "}
                <span className="text-xs rounded-lg bg-stone-50 px-2 py-1 text-[#71717a] ml-2">
                  15
                </span>
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="flex-1">
                Cancelled{" "}
                <span className="text-xs rounded-lg bg-stone-50 px-2 py-1 text-[#71717a] ml-2">
                  15
                </span>
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex-1">
                Completed{" "}
                <span className="text-xs rounded-lg bg-stone-50 px-2 py-1 text-[#71717a] ml-2">
                  15
                </span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming"><UpcomingAppointmentsList/></TabsContent>
            <TabsContent value="cancelled">Cancelled</TabsContent>
            <TabsContent value="completed">Completed</TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </ContentLayout>
  );
};

export default AppointmentsPage;
