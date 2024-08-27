"use client";

import React from "react";
import { SheetContent, Sheet } from "@/components/ui/sheet";
import { Chat } from "@/types/chat";
import MessageContainer from "../messages/MessageContainer";

interface ChatSheetProps {
  chat: Chat | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ChatSheet = ({ chat, open, setOpen }: ChatSheetProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        className="sm:max-w-[600px] w-full overflow-y-scroll p-0"
        showClose={false}
      >
        <MessageContainer
          chatId={chat?.chatId || ""}
          href="dashboard"
          handleClose={handleClose}
        />
      </SheetContent>
    </Sheet>
  );
};

export default ChatSheet;
