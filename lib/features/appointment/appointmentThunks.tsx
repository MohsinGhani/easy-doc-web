import { RootState } from "@/lib/store";
import { appointmentsApiClient } from "@/lib/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Create an appointment
const createAppointment = createAsyncThunk<Appointment, Partial<Appointment>>(
  "appointment/createAppointment",
  async (appointment, { rejectWithValue }) => {
    try {
      const response = await appointmentsApiClient.post(
        "/appointments",
        appointment
      );
      return response.data.data as Appointment;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error creating appointment, Pease try again!";
      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch all appointments
const fetchAllAppointments = createAsyncThunk<Appointment[]>(
  "appointment/fetchAllAppointments",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { role, userId } = state.auth.user;
      console.log("🚀 ~ role, userId:", role, userId);

      if (!role) {
        return rejectWithValue("User role is missing");
      }

      if (!userId) {
        return rejectWithValue("User ID is missing");
      }

      const response = await appointmentsApiClient.get(
        `${role === "doctor" ? "doctors" : "patients"}/${userId}/appointments`
      );
      return response.data.data as Appointment[];
    } catch (error: any) {
      // Extract error message from response or fallback to default
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error getting appointments, Pease try again!";
      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch appointment by ID (check if the appointment already exists in the store)
const fetchAppointmentById = createAsyncThunk<Appointment, string>(
  "appointment/fetchAppointmentById",
  async (appointmentId, { rejectWithValue }) => {
    try {
      const response = await appointmentsApiClient.get(
        `/appointments/${appointmentId}?status=PAYMENT_PENDING`
      );
      return response.data.data as Appointment;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error getting appointment, Pease try again!";
      return rejectWithValue(errorMessage);
    }
  }
);

// Make the payment of appointment
const makePaymentIntent = createAsyncThunk<
  Appointment,
  Partial<Payment> & { [key: string]: any }
>("appointment/makePayment", async (data, { rejectWithValue }) => {
  try {
    const response = await appointmentsApiClient.post(`/payments/intent`, data);
    return response.data.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Error making payment, Pease try again!";
    return rejectWithValue(errorMessage);
  }
});

// Make the payment of appointment
const makePayment = createAsyncThunk<
  Appointment,
  Partial<Payment> & { [key: string]: any }
>("appointment/makePayment", async (data, { rejectWithValue }) => {
  try {
    const response = await appointmentsApiClient.post(`/payments`, data);
    return response.data.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Error making payment, Pease try again!";
    return rejectWithValue(errorMessage);
  }
});

// Export all thunks
export const appointmentThunks = {
  fetchAllAppointments,
  fetchAppointmentById,
  createAppointment,
  makePaymentIntent,
  makePayment,
};
