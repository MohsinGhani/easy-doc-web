import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { notificationThunks } from "./notificationThunks";

const initialState: notificationState = {
  allNotifications: [],
  fetchedNotification: null,
  loading: false,
  error: null,
  lastEvaluatedKey: null,
};

export const notificationSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all notifications
    builder
      .addCase(notificationThunks.fetchAllNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        notificationThunks.fetchAllNotifications.fulfilled,
        (state, action) => {
          const { items, lastEvaluatedKey } = action.payload;
          state.allNotifications = [...state.allNotifications, ...items];
          state.lastEvaluatedKey = lastEvaluatedKey || null;

          state.loading = false;
        }
      )
      .addCase(
        notificationThunks.fetchAllNotifications.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload || "Failed to fetch notifications");
        }
      )

      // Make notifications read
      .addCase(notificationThunks.makeNotificationsRead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        notificationThunks.makeNotificationsRead.fulfilled,
        (state, action) => {
          state.allNotifications = state.allNotifications.map(
            (notification) => {
              if (
                notification.notificationId === action.payload.notificationId
              ) {
                return action.payload;
              }
              return notification;
            }
          );
          state.loading = false;
        }
      )
      .addCase(
        notificationThunks.makeNotificationsRead.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload || "Failed to make notifications read");
        }
      );
  },
});

export const {} = notificationSlice.actions;

export default notificationSlice.reducer;
