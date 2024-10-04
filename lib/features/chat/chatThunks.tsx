import { RootState } from "@/lib/store";
import { appointmentsApiClient } from "@/lib/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all appointments with pagination
const fetchAllChats = createAsyncThunk<
  { items: Chat[]; lastEvaluatedKey: string | null },
  { status?: APPOINTMENT_STATUS }
>("chat/fetchAllChats", async (params, { getState, rejectWithValue }) => {
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
});

// Fetch all appointments with pagination
const fetchChatsByPagination = createAsyncThunk<
  { items: Chat[]; lastEvaluatedKey: string | null },
  {
    startKey?: string | null;
    status?: APPOINTMENT_STATUS;
  }
>(
  "chat/fetchChatsByPagination",
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

// Create an chat
const createMessage = createAsyncThunk<Chat, Partial<Chat>>(
  "chat/createMessage",
  async (chat, { rejectWithValue }) => {
    try {
      const response = await appointmentsApiClient.post("/appointments", chat);
      return response.data.data as Chat;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error creating chat, Pease try again!";
      return rejectWithValue(errorMessage);
    }
  }
);

// Export all thunks
export const chatThunks = {
  fetchAllChats,
  fetchChatsByPagination,
  createMessage,
};
