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

// Fetch all appointments with pagination
const fetchAllAppointments = createAsyncThunk<
  { items: Appointment[]; lastEvaluatedKey: string | null },
  { status?: APPOINTMENT_STATUS }
>(
  "appointment/fetchAllAppointments",
  async (params, { getState, rejectWithValue }) => {
    try {
      const { status } = params;
      const state = getState() as RootState;
      const { role, userId } = state.auth.user;

      if (!role) {
        return rejectWithValue("User role is missing");
      }
      if (!userId) {
        return rejectWithValue("User ID is missing");
      }

      let url = `${
        role === "doctor" ? "doctors" : "patients"
      }/${userId}/appointments`;

      if (status) {
        url += `?status=${status}`;
      }

      const response = await appointmentsApiClient.get(url);

      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error getting appointments, Please try again!";
      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch all appointments with pagination
const fetchAppointmentsByPagination = createAsyncThunk<
  { items: Appointment[]; lastEvaluatedKey: string | null },
  {
    startKey?: string | null;
    status?: APPOINTMENT_STATUS;
  }
>(
  "appointment/fetchAppointmentsByPagination",
  async (params, { getState, rejectWithValue }) => {
    try {
      const { startKey = null, status } = params;
      const state = getState() as RootState;
      const { role, userId } = state.auth.user;

      if (!role) {
        return rejectWithValue("User role is missing");
      }
      if (!userId) {
        return rejectWithValue("User ID is missing");
      }

      let url = `${
        role === "doctor" ? "doctors" : "patients"
      }/${userId}/appointments`;

      if (status) {
        url += `?status=${status}`;
      }

      if (startKey) {
        url += `&startKey=${encodeURIComponent(startKey)}`;
      }

      const response = await appointmentsApiClient.get(url);

      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error getting appointments, Please try again!";
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
        `/appointments/${appointmentId}`
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

// Update the appointment status
const updateAppointmentStatus = createAsyncThunk<
  Appointment,
  { appointmentId: string; status: APPOINTMENT_STATUS }
>(
  "appointment/updateAppointmentStatus",
  async ({ appointmentId, status }, { rejectWithValue }) => {
    try {
      const response = await appointmentsApiClient.post(
        `/appointments/update-status`,
        { appointmentId, status }
      );
      return response.data.data as Appointment;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error updating appointment, Pease try again!";
      return rejectWithValue(errorMessage);
    }
  }
);

// Export all thunks
export const appointmentThunks = {
  fetchAllAppointments,
  fetchAppointmentById,
  createAppointment,
  makePaymentIntent,
  makePayment,
  updateAppointmentStatus,
  fetchAppointmentsByPagination,
};
