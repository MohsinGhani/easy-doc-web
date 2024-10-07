import { notificationsApiClient } from "@/lib/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";

// Fetch all notifications
const fetchAllNotifications = createAsyncThunk<{
  items: Notification[];
  lastEvaluatedKey: string | null;
}>(
  "notification/fetchAllNotifications",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const userId = state.auth.user?.userId;

      if (!userId) {
        return rejectWithValue("User not found!");
      }

      let url = `/notifications/${userId}`;

      const response = await notificationsApiClient.get(url);
      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error getting notifications, Pease try again!";
      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch all notifications
const fetchNotificationsWithPagination = createAsyncThunk<
  {
    items: Notification[];
    lastEvaluatedKey: string | null;
  },
  { startKey?: string | null }
>(
  "notification/fetchNotificationsWithPagination",
  async (params, { getState, rejectWithValue }) => {
    try {
      const { startKey = null } = params;
      const state = getState() as RootState;
      const userId = state.auth.user?.userId;

      if (!userId) {
        return rejectWithValue("User not found!");
      }

      let url = `/notifications/${userId}`;
      if (startKey) {
        url += `?startKey=${encodeURIComponent(startKey)}`;
      }

      const response = await notificationsApiClient.get(url);
      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error getting notifications, Pease try again!";
      return rejectWithValue(errorMessage);
    }
  }
);

// Make notifications Read
const makeNotificationsRead = createAsyncThunk<Notification, string>(
  "notification/makeNotificationsRead",
  async (notificationId, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const userId = state.auth.user?.userId;

      const response = await notificationsApiClient.post(
        `/notifications/read/${notificationId}?userId=${userId}`
      );

      return response.data.data;
    } catch (error: any) {
      // Extract error message from response or fallback to default
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error making notifications read, Pease try again!";
      return rejectWithValue(errorMessage);
    }
  }
);

// Export all thunks
export const notificationThunks = {
  fetchAllNotifications,
  fetchNotificationsWithPagination,
  makeNotificationsRead,
};
