"use client";

import React, { useEffect } from "react";
import { SheetContent, Sheet } from "@/components/ui/sheet";
import MessageContainer from "@/components/conversations/MessageContainer";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { conversationThunks } from "@/lib/features/conversation/conversationThunks";

interface ChatSheetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ConversationSheet = ({ open, setOpen }: ChatSheetProps) => {
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useAppDispatch();
  const { fetchedConversation } = useAppSelector((state) => state.conversation);

  useEffect(() => {
    open &&
      fetchedConversation &&
      fetchedConversation.lastMessageRead === false &&
      fetchedConversation.lastMessageId &&
      fetchedConversation.lastMessage &&
      dispatch(
        conversationThunks.seenMessage({
          conversationId: fetchedConversation.conversationId,
          messageId: fetchedConversation.lastMessageId,
        })
      );
  }, [dispatch, fetchedConversation]);

  if (!fetchedConversation) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        className="sm:max-w-[600px] w-full overflow-y-scroll p-0"
        showClose={false}
      >
        <MessageContainer href="dashboard" handleClose={handleClose} />
      </SheetContent>
    </Sheet>
  );
};

export default ConversationSheet;
