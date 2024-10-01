import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { appointmentThunks } from "./appointmentThunks";

const initialState: appointmentState = {
  allAppointments: [],
  fetchedAppointment: null,
  loading: false,
  error: null,
  lastEvaluatedKey: null,
};

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all appointments
      .addCase(appointmentThunks.fetchAllAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.allAppointments = [];
        state.lastEvaluatedKey = null;
      })
      .addCase(
        appointmentThunks.fetchAllAppointments.fulfilled,
        (state, action) => {
          const { items, lastEvaluatedKey } = action.payload;
          state.allAppointments = items;
          state.lastEvaluatedKey = lastEvaluatedKey || null;

          state.loading = false;
        }
      )
      .addCase(
        appointmentThunks.fetchAllAppointments.rejected,
        (state, action) => {
          console.log("🚀 ~ action:", action);
          state.loading = false;
          state.error = action.payload as string;
          toast.error(
            (action.payload as string) || "Failed to fetch appointments"
          );
        }
      )

      // Fetch all appointments with pagination
      .addCase(
        appointmentThunks.fetchAppointmentsByPagination.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.lastEvaluatedKey = null;
        }
      )
      .addCase(
        appointmentThunks.fetchAppointmentsByPagination.fulfilled,
        (state, action) => {
          const { items, lastEvaluatedKey } = action.payload;
          state.allAppointments = [...state.allAppointments, ...items];
          state.lastEvaluatedKey = lastEvaluatedKey || null;

          state.loading = false;
        }
      )
      .addCase(
        appointmentThunks.fetchAppointmentsByPagination.rejected,
        (state, action) => {
          console.log("🚀 ~ action:", action);
          state.loading = false;
          state.error = action.payload as string;
          toast.error(
            (action.payload as string) || "Failed to fetch appointments"
          );
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
      )

      // Make payment intent
      .addCase(appointmentThunks.makePaymentIntent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        appointmentThunks.makePaymentIntent.fulfilled,
        (state, action: PayloadAction<Appointment>) => {
          state.loading = false;
          // toast.success("Payment successful.");
        }
      )
      .addCase(
        appointmentThunks.makePaymentIntent.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload || "Failed to make payment");
        }
      )

      // Update appointment status
      .addCase(appointmentThunks.updateAppointmentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        appointmentThunks.updateAppointmentStatus.fulfilled,
        (state, action: PayloadAction<Appointment>) => {
          state.allAppointments = state.allAppointments.map((appointment) => {
            if (appointment.appointmentId === action.payload.appointmentId) {
              return action.payload;
            }
            return appointment;
          });
          if (
            state.fetchedAppointment?.appointmentId ===
            action.payload.appointmentId
          ) {
            state.fetchedAppointment = action.payload;
          }
          toast.success("Appointment status updated successfully.");
          state.loading = false;
        }
      )
      .addCase(
        appointmentThunks.updateAppointmentStatus.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload || "Failed to update appointment status");
        }
      );
  },
});

export const {} = appointmentSlice.actions;

export default appointmentSlice.reducer;
