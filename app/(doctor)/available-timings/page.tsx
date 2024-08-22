"use client";

import { ContentLayout } from "@/components/layout/content-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { AddTimeSlotDialog } from "@/components/AddTimeSlotDialog";
import { Clock3 } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";

const AvailableTimingsPage = () => {
  const availableDays = useAppSelector(
    (state) => state.availability.availableDays
  );

  return (
    <ContentLayout title="Available Timings">
      <Card>
        <CardContent>
          <h2 className="text-xl font-medium mb-5">Select Available Slots </h2>

          <Separator className="my-6" />

          <Tabs defaultValue="monday">
            <h2 className="text-sm font-medium">Select Available Days</h2>
            <TabsList className="my-6 w-full">
              {availableDays.map((value, i) => (
                <TabsTrigger
                  value={value.day}
                  className="flex-1 capitalize"
                  key={i}
                >
                  {value.day}
                </TabsTrigger>
              ))}
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
                      <div
                        key={i}
                        className="flex items-center p-2 gap-1 bg-secondary w-36 border rounded-md border-stone-600/30 font-semibold"
                      >
                        <Clock3 className="w-3.5 h-3" />
                        <p className="text-sm ">{`${startTime} - ${endTime}`}</p>
                      </div>
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
