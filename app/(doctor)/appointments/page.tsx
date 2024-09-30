import { ContentLayout } from "@/components/layout/content-layout";
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
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Easy Doc | Appointments",
  description: "Here you can view & manage all your appointments",
};

const AppointmentsPage = () => {
  return (
    <ContentLayout title="Appointments">
      <Card>
        <CardContent>
          <Tabs defaultValue="upcoming">
            <TabsList
              className="md:hidden w-full mb-6 mt-2"
              defaultValue="upcoming"
            >
              <Carousel className="w-full max-w-[80%]">
                <CarouselContent className="w-full">
                  {["upcoming", "cancelled", "completed"].map((value, i) => (
                    <CarouselItem key={i} className="basis-1/3 min-w-[150px]">
                      <TabsTrigger
                        value={value}
                        className="w-full capitalize p-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
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
            <TabsContent value="cancelled">Cancelled</TabsContent>
            <TabsContent value="completed">Completed</TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </ContentLayout>
  );
};

export default AppointmentsPage;
