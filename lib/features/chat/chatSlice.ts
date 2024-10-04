import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { chatThunks } from "./chatThunks";

const initialState: chatState = {
  allChats: [],
  loading: false,
  error: null,
  lastEvaluatedKey: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all appointments
      .addCase(chatThunks.fetchAllChats.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.allChats = [];
        state.lastEvaluatedKey = null;
      })
      .addCase(chatThunks.fetchAllChats.fulfilled, (state, action) => {
        const { items, lastEvaluatedKey } = action.payload;
        state.allChats = items;
        state.lastEvaluatedKey = lastEvaluatedKey || null;

        state.loading = false;
      })
      .addCase(chatThunks.fetchAllChats.rejected, (state, action) => {
        console.log("🚀 ~ action:", action);
        state.loading = false;
        state.error = action.payload as string;
        toast.error(
          (action.payload as string) || "Failed to fetch appointments"
        );
      })

      // Fetch all appointments with pagination
      .addCase(chatThunks.fetchChatsByPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.lastEvaluatedKey = null;
      })
      .addCase(chatThunks.fetchChatsByPagination.fulfilled, (state, action) => {
        const { items, lastEvaluatedKey } = action.payload;
        state.allChats = [...state.allChats, ...items];
        state.lastEvaluatedKey = lastEvaluatedKey || null;

        state.loading = false;
      })
      .addCase(chatThunks.fetchChatsByPagination.rejected, (state, action) => {
        console.log("🚀 ~ action:", action);
        state.loading = false;
        state.error = action.payload as string;
        toast.error(
          (action.payload as string) || "Failed to fetch appointments"
        );
      })

      // Create chat
      .addCase(chatThunks.createMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        chatThunks.createMessage.fulfilled,
        (state, action: PayloadAction<Chat>) => {
          state.allChats.push(action.payload);
          toast.success("Chat created successfully.");
          state.loading = false;
        }
      )
      .addCase(
        chatThunks.createMessage.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload || "Failed to create chat");
        }
      );
  },
});

export const {} = chatSlice.actions;

export default chatSlice.reducer;
