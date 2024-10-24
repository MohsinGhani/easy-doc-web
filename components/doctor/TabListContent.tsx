"use client";

import { useAppSelector } from "@/lib/hooks";
import { AddTimeSlotDialog } from "@/components/doctor/AddTimeSlotDialog";
import TimeSlot from "@/components/doctor/TimeSlot";
import { TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Loader } from "@/components/common/Loader";

interface TabListContentProps {
  day: string;
  dayIndex: number;
}

const TabListContent = ({ day, dayIndex }: TabListContentProps) => {
  const {
    loading,
    user: { availableDays },
  } = useAppSelector((state) => state.auth);

  return (
    <TabsContent value={day} key={dayIndex}>
      <div className="flex items-center justify-between flex-col sm:flex-row gap-6">
        <h3 className="text-xl font-medium capitalize">{day}</h3>
        <AddTimeSlotDialog day={day} dayIndex={dayIndex} />
      </div>
      <Separator className="my-6" />

      {loading ? (
        <Loader />
      ) : availableDays[dayIndex]?.slots?.length > 0 ? (
        // TODO: Make this grid to perform well
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">
          {availableDays[dayIndex]?.slots?.map(
            ({ start_time, end_time }, slotIndex) => (
              <TimeSlot
                startTime={start_time}
                endTime={end_time}
                key={slotIndex}
                dayIndex={dayIndex}
                slotIndex={slotIndex}
              />
            )
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No slots available. Add new slots now.
        </p>
      )}
    </TabsContent>
  );
};

export default TabListContent;
