import { RootState } from "@/lib/store";
import { conversationsApiClient } from "@/lib/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all conversations with pagination
const fetchAllConversations = createAsyncThunk<{
  items: Conversation[];
  lastEvaluatedKey: string | null;
}>(
  "conversation/fetchAllConversations",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { role, userId } = state.auth.user;

      if (!userId) {
        return rejectWithValue("User not found");
      }

      if (!role) {
        return rejectWithValue("Role not found");
      }

      const response = await conversationsApiClient.get(
        `/conversations/${userId}?role=${role}`
      );

      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error getting conversations, Please try again!";
      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch all conversations with pagination
const fetchConversationsByPagination = createAsyncThunk<
  { items: Conversation[]; lastEvaluatedKey: string | null },
  {
    startKey?: string | null;
    status?: APPOINTMENT_STATUS;
  }
>(
  "conversation/fetchConversationsByPagination",
  async (params, { getState, rejectWithValue }) => {
    try {
      const { startKey = null } = params;
      const state = getState() as RootState;
      const { role, userId } = state.auth.user;

      let url = `/conversations${userId}?role=${role}`;

      if (startKey) {
        url += `&startKey=${encodeURIComponent(startKey)}`;
      }

      const response = await conversationsApiClient.get(url);

      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error getting conversations, Please try again!";
      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch conversation by ID (check if the conversation already exists in the store)
const fetchConversationById = createAsyncThunk<Conversation, string>(
  "conversation/fetchConversationById",
  async (conversationId, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { role, userId } = state.auth.user;

      const response = await conversationsApiClient.get(
        `/conversation/${conversationId}?role=${role}&userId=${userId}`
      );

      return response.data.data as Conversation;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error getting conversation, Pease try again!";
      return rejectWithValue(errorMessage);
    }
  }
);

// Create an conversation
const sendMessage = createAsyncThunk<
  Message,
  Partial<Message> & Partial<Conversation>
>(
  "conversation/sendMessage",
  async ({ conversationId, text, attachments }, { rejectWithValue }) => {
    try {
      if (!text && attachments?.length === 0)
        return rejectWithValue("Missing Required Fields");

      const response = await conversationsApiClient.post(
        `/conversation/${conversationId}`
      );
      return { ...response.data.data, conversationId } as Message;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error creating conversation, Pease try again!";
      return rejectWithValue(errorMessage);
    }
  }
);

// Export all thunks
export const conversationThunks = {
  fetchAllConversations,
  fetchConversationsByPagination,
  fetchConversationById,
  sendMessage,
};
