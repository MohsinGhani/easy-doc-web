import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { appointmentThunks } from "./appointmentThunks";

interface appointmentSlice {
  allAppointments: Appointment[];
  fetchedAppointment: Appointment | null;
  loading: boolean;
  error: string | null | undefined;
}

const initialState: appointmentSlice = {
  allAppointments: [],
  fetchedAppointment: null,
  loading: false,
  error: null,
};

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all appointments
    builder
      .addCase(appointmentThunks.fetchAllAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        appointmentThunks.fetchAllAppointments.fulfilled,
        (state, action: PayloadAction<Appointment[]>) => {
          state.allAppointments = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        appointmentThunks.fetchAllAppointments.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload || "Failed to fetch appointments");
        }
      )

      // Fetch appointment by ID
      .addCase(appointmentThunks.fetchAppointmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        appointmentThunks.fetchAppointmentById.fulfilled,
        (state, action: PayloadAction<Appointment>) => {
          state.fetchedAppointment = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        appointmentThunks.fetchAppointmentById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload || "Failed to fetch appointment details");
        }
      )

      // Create appointment
      .addCase(appointmentThunks.createAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        appointmentThunks.createAppointment.fulfilled,
        (state, action: PayloadAction<Appointment>) => {
          state.allAppointments.push(action.payload);
          toast.success("Appointment created successfully.");
          state.loading = false;
        }
      )
      .addCase(
        appointmentThunks.createAppointment.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload || "Failed to create appointment");
        }
      );
  },
});

export const {} = appointmentSlice.actions;

export default appointmentSlice.reducer;
