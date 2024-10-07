"use client";

import React, { KeyboardEvent, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Paperclip, Image as ImageIcon, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Send, Write } from "../icons";
import { cn } from "@/lib/utils";
import { conversationThunks } from "@/lib/features/conversation/conversationThunks";

const SendMessageButton = ({ nonSticky = false }: { nonSticky: boolean }) => {
  const dispatch = useAppDispatch();
  const { fetchedConversation } = useAppSelector((state) => state.conversation);
  const { role, userId } = useAppSelector((state) => state.auth.user);

  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    console.log(message);

    dispatch(
      conversationThunks.sendMessage({
        text: message,
        conversationId: fetchedConversation?.conversationId,
        recipientUserId:
          role === "doctor" ? fetchedConversation?.patientId : fetchedConversation?.doctorId,
        senderId: userId,
      })
    );

    setMessage("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div
      className={cn("bg-white", {
        "fixed bottom-0 z-50 right-0 w-full sm:max-w-[600px]": !nonSticky,
        "absolute bottom-0 z-50 right-0 w-full": nonSticky,
      })}
    >
      <Separator />

      <div className="flex items-center justify-between gap-4 lg:py-4 sm:py-3 lg:px-12 sm:px-5 px-2 py-2">
        <div className="flex items-center gap-4">
          <Mic className="w-4 h-4 text-[#374151] cursor-pointer" />
          <ImageIcon className="w-4 h-4 text-[#374151] cursor-pointer" />
          <Paperclip className="w-4 h-4 text-[#374151] cursor-pointer" />
        </div>

        <div className="relative flex items-center flex-1">
          <div className="absolute left-3">
            <Write className="h-4 w-4 fill-white" />
          </div>
          <input
            type="text"
            placeholder="Your message....."
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full pl-11 pr-4 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent placeholder-gray-400 text-sm shadow-sm flex-1"
            autoComplete="off"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <Button size={"icon"} variant={"ghost"} onClick={handleSend}>
          <Send />
        </Button>
      </div>
    </div>
  );
};

export default SendMessageButton;
