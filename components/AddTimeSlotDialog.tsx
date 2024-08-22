"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { TimeInput } from "./TimeInput";
import { addTimeSlot } from "@/lib/features/doctor/availabilitySlice";
import { useAppDispatch } from "@/lib/hooks";

interface AddTimeSlotDialogProps {
  day: string;
}

export function AddTimeSlotDialog({ day }: AddTimeSlotDialogProps) {
  const [open, setOpen] = useState(false);
  const [startTime, setStartTime] = useState("09:00 AM");
  const [endTime, setEndTime] = useState("09:30 AM");
  const dispatch = useAppDispatch();

  const handleAddSlot = () => {
    dispatch(addTimeSlot({ day, slot: { startTime, endTime } }));
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="ghost"
        className="text-sm text-primary hover:text-primary/80"
      >
        + Add a slot
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add availability for {day}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="start-time" className="text-sm font-medium">
                  Start time
                </label>
                <TimeInput
                  id="start-time"
                  value={startTime}
                  onChange={setStartTime}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="end-time" className="text-sm font-medium">
                  End time
                </label>
                <TimeInput
                  id="end-time"
                  value={endTime}
                  onChange={setEndTime}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSlot}>Add Slot</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
