import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card } from "../ui/card";

export default function AvailableTimings({
  availableDays,
}: {
  availableDays: AvailableDay[];
}) {
  // State to keep track of the selected day
  const [activeDay, setActiveDay] = useState(availableDays[0]?.day);

  // Find the active day's slots based on selected day
  const activeSlots =
    availableDays.find((day) => day.day === activeDay)?.slots || [];

  if (!activeSlots || activeSlots.length === 0) {
    return <div>No available slots found for the selected day.</div>;
  }

  return (
    <div className="bg-background rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Available Slots:</h2>
      <div className="grid md:grid-cols-[240px_1fr] gap-6 w-full">
        {/* Left-side navigation with buttons */}
        <Card className="p-3">
          <nav className="flex flex-col">
            {availableDays.map((day) => (
              <Button
                key={day.day}
                variant={activeDay === day.day ? "default" : "ghost"}
                size={"lg"}
                className="justify-start gap-3 px-4 py-3 text-left w-full transition-colors capitalize"
                onClick={() => setActiveDay(day.day)}
              >
                {day.day}
              </Button>
            ))}
          </nav>
        </Card>

        {/* Right-side content showing available slots */}
        <div className="">
          <h2 className="text-xl font-bold mb-4">
            Available Slots for {activeDay}
          </h2>
          <Separator className="my-4" />
          {/* TODO: Fix lg, sm, md grid cols */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {activeSlots.length > 0 ? (
              activeSlots.map((slot, index) => (
                <TimeSlot
                  key={index}
                  startTime={slot.start_time}
                  endTime={slot.end_time}
                />
              ))
            ) : (
              <p className="text-muted-foreground">
                No slots available for {activeDay}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const TimeSlot = ({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}) => (
  <div className="bg-white shadow-md rounded-md p-3 text-center">
    <p>
      {startTime} - {endTime}
    </p>
  </div>
);
