import { ContentLayout } from "@/components/layout/content-layout";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const AppointmentsPage = () => {
  return (
    <ContentLayout title="Appointments">
      <Card>
        <CardContent>
          <Tabs defaultValue="upcoming">
            <TabsList className="my-6 w-full">
              <TabsTrigger value="upcoming" className="flex-1">
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="flex-1">
                Cancelled
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex-1">
                Completed
              </TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">Upcoming</TabsContent>
            <TabsContent value="cancelled">Cancelled</TabsContent>
            <TabsContent value="completed">Completed</TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </ContentLayout>
  );
};

export default AppointmentsPage;
