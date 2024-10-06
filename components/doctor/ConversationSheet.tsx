"use client";

import React from "react";
import { SheetContent, Sheet } from "@/components/ui/sheet";
import MessageContainer from "@/components/messages/MessageContainer";

interface ChatSheetProps {
  selectedConversation: Conversation | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ConversationSheet = ({
  selectedConversation,
  open,
  setOpen,
}: ChatSheetProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  if (!selectedConversation) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        className="sm:max-w-[600px] w-full overflow-y-scroll p-0"
        showClose={false}
      >
        <MessageContainer
          selectedConversation={selectedConversation}
          href="dashboard"
          handleClose={handleClose}
        />
      </SheetContent>
    </Sheet>
  );
};

export default ConversationSheet;
