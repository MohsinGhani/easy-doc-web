// availabilitySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface AvailableDay {
  day: string;
  slots: TimeSlot[];
}

interface AvailabilityState {
  availableDays: AvailableDay[];
}

const initialState: AvailabilityState = {
  availableDays: [
    { day: "monday", slots: [] },
    { day: "tuesday", slots: [] },
    { day: "wednesday", slots: [] },
    { day: "thursday", slots: [] },
    { day: "friday", slots: [] },
    { day: "saturday", slots: [] },
    { day: "sunday", slots: [] },
  ],
};

const availabilitySlice = createSlice({
  name: "availability",
  initialState,
  reducers: {
    addTimeSlot: (
      state,
      action: PayloadAction<{ day: string; slot: TimeSlot }>
    ) => {
      const { day, slot } = action.payload;
      const dayIndex = state.availableDays.findIndex((d) => d.day === day);
      if (dayIndex !== -1) {
        state.availableDays[dayIndex].slots.push(slot);
      }
    },
  },
});

export const { addTimeSlot } = availabilitySlice.actions;
export default availabilitySlice.reducer;
