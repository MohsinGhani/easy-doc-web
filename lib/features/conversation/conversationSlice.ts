import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { conversationThunks } from "./conversationThunks";

const initialState: conversationState = {
  allConversations: [],
  fetchedConversation: null,
  loading: false,
  error: null,
  lastEvaluatedKey: null,
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all conversation
      .addCase(conversationThunks.fetchAllConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.allConversations = [];
        state.lastEvaluatedKey = null;
      })
      .addCase(
        conversationThunks.fetchAllConversations.fulfilled,
        (state, action) => {
          const { items, lastEvaluatedKey } = action.payload;
          state.allConversations = items;
          state.lastEvaluatedKey = lastEvaluatedKey || null;

          state.loading = false;
        }
      )
      .addCase(
        conversationThunks.fetchAllConversations.rejected,
        (state, action) => {
          console.log("🚀 ~ action:", action);
          state.loading = false;
          state.error = action.payload as string;
          toast.error(
            (action.payload as string) || "Failed to fetch conversation"
          );
        }
      )

      // Fetch all conversation with pagination
      .addCase(
        conversationThunks.fetchConversationsByPagination.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.lastEvaluatedKey = null;
        }
      )
      .addCase(
        conversationThunks.fetchConversationsByPagination.fulfilled,
        (state, action) => {
          const { items, lastEvaluatedKey } = action.payload;
          state.allConversations = [...state.allConversations, ...items];
          state.lastEvaluatedKey = lastEvaluatedKey || null;

          state.loading = false;
        }
      )
      .addCase(
        conversationThunks.fetchConversationsByPagination.rejected,
        (state, action) => {
          console.log("🚀 ~ action:", action);
          state.loading = false;
          state.error = action.payload as string;
          toast.error(
            (action.payload as string) || "Failed to fetch conversation"
          );
        }
      )

      // Fetch conversation by ID
      .addCase(conversationThunks.fetchConversationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        conversationThunks.fetchConversationById.fulfilled,
        (state, action) => {
          state.fetchedConversation = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        conversationThunks.fetchConversationById.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          toast.error(
            (action.payload as string) || "Failed to fetch conversation"
          );
        }
      )

      // sendMessage in the conversation
      .addCase(conversationThunks.sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        conversationThunks.sendMessage.fulfilled,
        (state, action: PayloadAction<Message>) => {
          state.loading = false;
          state.fetchedConversation?.messages.push(action.payload);
        }
      )
      .addCase(
        conversationThunks.sendMessage.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload || "Failed to create conversation");
        }
      );
  },
});

export const {} = conversationSlice.actions;

export default conversationSlice.reducer;
