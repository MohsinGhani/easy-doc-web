import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { conversationThunks } from "./conversationThunks";

const initialState: conversationState = {
  allConversations: [],
  fetchedConversation: null,
  Cloading: false,
  Mloading: false,
  error: null,
  ClastEvaluatedKey: null,
  MlastEvaluatedKey: null,
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    // update the fetched conversation messages and all conversations messages list by pushing the newly sent message to it
    updateMessages: (state, action: PayloadAction<Message>) => {
      if (state.fetchedConversation) {
        state.fetchedConversation?.messages.push(action.payload);
        state.fetchedConversation.lastMessage =
          action.payload.text ?? "Sent an attachment";
        state.fetchedConversation.lastMessageAt = action.payload.sentAt;
        state.fetchedConversation.lastMessageRead = false;
        state.allConversations = state.allConversations.map((conv) => {
          if (conv.conversationId === state.fetchedConversation?.conversationId)
            return { ...state.fetchedConversation, lastMessageRead: false };
          return conv;
        });
      } else {
        state.allConversations = state.allConversations.map((conv) => {
          if (conv.conversationId === action.payload.conversationId) {
            conv.messages.push(action.payload);
            conv.lastMessage = action.payload.text ?? "Sent an attachment";
            conv.lastMessageAt = action.payload.sentAt;
            conv.lastMessageRead = false;
            return conv;
          }
          return conv;
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all conversation
      .addCase(conversationThunks.fetchAllConversations.pending, (state) => {
        state.Cloading = true;
        state.error = null;
        state.allConversations = [];
        state.ClastEvaluatedKey = null;
        state.MlastEvaluatedKey = null;
      })
      .addCase(
        conversationThunks.fetchAllConversations.fulfilled,
        (state, action) => {
          const { items, lastEvaluatedKey } = action.payload;
          state.allConversations = items;
          state.ClastEvaluatedKey = lastEvaluatedKey || null;

          state.Cloading = false;
        }
      )
      .addCase(
        conversationThunks.fetchAllConversations.rejected,
        (state, action) => {
          console.log("🚀 ~ action:", action);
          state.error = action.payload as string;
          state.Cloading = false;
          toast.error(
            (action.payload as string) || "Failed to fetch conversation"
          );
        }
      )

      // Fetch all conversation with pagination
      .addCase(
        conversationThunks.fetchConversationsByPagination.pending,
        (state) => {
          state.Cloading = true;
          state.error = null;
          state.ClastEvaluatedKey = null;
          state.MlastEvaluatedKey = null;
        }
      )
      .addCase(
        conversationThunks.fetchConversationsByPagination.fulfilled,
        (state, action) => {
          const { items, lastEvaluatedKey } = action.payload;
          state.allConversations = [...state.allConversations, ...items];
          state.ClastEvaluatedKey = lastEvaluatedKey || null;

          state.Cloading = false;
        }
      )
      .addCase(
        conversationThunks.fetchConversationsByPagination.rejected,
        (state, action) => {
          console.log("🚀 ~ action:", action);
          state.error = action.payload as string;
          state.Cloading = false;
          toast.error(
            (action.payload as string) || "Failed to fetch conversation"
          );
        }
      )

      // Fetch conversation by ID
      .addCase(conversationThunks.fetchConversationById.pending, (state) => {
        state.Cloading = true;
        state.error = null;
      })
      .addCase(
        conversationThunks.fetchConversationById.fulfilled,
        (state, action) => {
          state.fetchedConversation = action.payload.conversation;
          state.MlastEvaluatedKey = action.payload.lastEvaluatedKey;
          state.Cloading = false;
        }
      )
      .addCase(
        conversationThunks.fetchConversationById.rejected,
        (state, action) => {
          state.Cloading = false;
          state.error = action.payload as string;
          toast.error(
            (action.payload as string) || "Failed to fetch conversation"
          );
        }
      )

      // sendMessage in the conversation
      .addCase(conversationThunks.sendMessage.pending, (state) => {
        state.Mloading = true;
        state.Cloading = true;
        state.error = null;
      })
      .addCase(
        conversationThunks.sendMessage.fulfilled,
        (state, action: PayloadAction<Message>) => {
          if (state.fetchedConversation) {
            state.fetchedConversation?.messages.push(action.payload);
            state.fetchedConversation.lastMessage =
              action.payload.text ?? "Sent an attachment";
            state.fetchedConversation.lastMessageAt = action.payload.sentAt;
            state.fetchedConversation.lastMessageRead = false;
            state.allConversations = state.allConversations.map((conv) => {
              if (
                conv.conversationId ===
                state.fetchedConversation?.conversationId
              )
                return { ...state.fetchedConversation, lastMessageRead: false };
              return conv;
            });
          } else {
            state.allConversations = state.allConversations.map((conv) => {
              if (conv.conversationId === action.payload.conversationId) {
                conv.messages.push(action.payload);
                conv.lastMessage = action.payload.text ?? "Sent an attachment";
                conv.lastMessageAt = action.payload.sentAt;
                conv.lastMessageRead = false;
                return conv;
              }
              return conv;
            });
          }

          state.Mloading = false;
          state.Cloading = false;
        }
      )
      .addCase(
        conversationThunks.sendMessage.rejected,
        (state, action: PayloadAction<any>) => {
          state.Mloading = false;
          state.error = action.payload;
          toast.error(action.payload || "Failed to create conversation");
        }
      )

      // Seen a message by making the conversdation lastMessageRead to true and message isRead to true
      .addCase(conversationThunks.seenMessage.pending, (state) => {
        state.Mloading = true;
        state.error = null;
      })
      .addCase(conversationThunks.seenMessage.fulfilled, (state) => {
        state.fetchedConversation!.lastMessageRead = true;
        state.fetchedConversation!.messages =
          state.fetchedConversation!.messages.map((msg) => {
            msg.isRead = true;
            return msg;
          });
        state.allConversations = state.allConversations.map((conv) => {
          if (conv.conversationId === state.fetchedConversation?.conversationId)
            return state.fetchedConversation;
          return conv;
        });
        state.Mloading = false;
      })
      .addCase(
        conversationThunks.seenMessage.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
          state.Mloading = false;
          // toast.error(action.payload || "Failed to mark message as read");
        }
      )

      // Handle more messages fetching
      .addCase(conversationThunks.fetchMoreMessages.pending, (state) => {
        state.Mloading = true;
        state.error = null;
      })
      .addCase(
        conversationThunks.fetchMoreMessages.fulfilled,
        (state, action) => {
          state.Mloading = false;
          const { messages, lastEvaluatedKey } = action.payload;

          if (state.fetchedConversation) {
            state.fetchedConversation.messages = [
              ...messages,
              ...state.fetchedConversation.messages,
            ];
          }
          state.MlastEvaluatedKey = lastEvaluatedKey;
        }
      )
      .addCase(
        conversationThunks.fetchMoreMessages.rejected,
        (state, action: PayloadAction<any>) => {
          state.Mloading = false;
          state.error = action.payload;
          toast.error(action.payload || "Failed to load more messages");
        }
      )

      // Add a note
      .addCase(conversationThunks.addNote.pending, (state) => {
        state.Cloading = true;
        state.error = null;
      })
      .addCase(conversationThunks.addNote.fulfilled, (state, action) => {
        state.fetchedConversation!.note = action.payload;
        state.Cloading = false;
      })
      .addCase(
        conversationThunks.addNote.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
          state.Cloading = false;
          toast.error(action.payload || "Failed to add note");
        }
      )  

      // Delete a note
      .addCase(conversationThunks.deleteNote.pending, (state) => {
        state.Cloading = true;
        state.error = null;
      })
      .addCase(conversationThunks.deleteNote.fulfilled, (state, action) => {
        state.fetchedConversation!.note = "";
        state.Cloading = false;
      })
      .addCase(
        conversationThunks.deleteNote.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
          state.Cloading = false;
          toast.error(action.payload || "Failed to delete note");
        }
      );
  },
});

export const { updateMessages } = conversationSlice.actions;

export default conversationSlice.reducer;
