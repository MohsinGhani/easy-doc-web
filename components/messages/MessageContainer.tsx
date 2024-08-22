"use client";

import { Separator } from "@/components/ui/separator";
import { chats } from "@/types/chat";
import {
  ArrowLeft,
  Paperclip,
  Phone,
  Image as ImageIcon,
  Video,
  Mic,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import MessageCard from "@/components/messages/MessageCard";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface MessageContainerProps {
  chatId: string;
  href?: string;
  handleClose?: () => void;
  className?: string;
}

const MessageContainer = ({
  chatId,
  href = "messages",
  handleClose,
  className,
}: MessageContainerProps) => {
  const [message, setMessage] = useState("");
  const currentChat = chats.find((c) => c.chatId === chatId);

  const handleSend = () => {
    if (!message.trim()) return;
    console.log(message);

    currentChat?.messages.push({
      author: {
        userId: "1",
      },
      text: message,
      replies: [],
      attachments: [],
    });

    setMessage("");
  };

  return (
    <>
      <div
        className={cn("flex items-center lg:gap-4 sm:gap-3 gap-1", className)}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild className="lg:hidden cursor-pointer">
              {!handleClose ? (
                <Link className="" href={`/${href}`}>
                  <ArrowLeft className="sm:w-6 w-4 sm:h-6 h-4" />
                </Link>
              ) : (
                <>
                  <ArrowLeft
                    className="sm:w-6 w-4 sm:h-6 h-4 cursor-pointer"
                    onClick={handleClose}
                  />
                </>
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>Back to {href}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="justify-start items-center sm:gap-2 gap-1 flex flex-1">
          <Image
            className="sm:w-12 w-8 sm:h-12 h-8 rounded-full"
            src={currentChat?.avatar || "https://via.placeholder.com/50x50"}
            alt="avatar"
            width={50}
            height={50}
          />
          <div className="flex-col justify-center items-start gap-1 inline-flex">
            <div className="text-zinc-900 sm:text-2xl text-sm sm:font-medium font-bold">
              {currentChat?.name || "Annette Black"}
            </div>
            <div className="text-muted-foreground md:text-base text-sm font-normal sm:block leading-none hidden">
              {/* TODO: this is not a good way */}
              London , UK
            </div>
          </div>
        </div>
        <div className="justify-start items-center sm:gap-4 gap-1 flex">
          <div className="md:w-12 w-10 md:h-12 h-10 bg-secondary flex items-center justify-center rounded-full">
            <Video className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="md:w-12 w-10 md:h-12 h-10 bg-secondary flex items-center justify-center rounded-full">
            <Phone className="w-6 h-6 text-muted-foreground" />
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <p className="text-black text-sm font-normal text-center">Yesterday</p>

      <div className="relative flex flex-col gap-4 flex-1">
        {currentChat?.messages.map((message, i) => (
          <MessageCard key={i} message={message} />
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 mt-20">
        <Mic className="w-4 h-4 text-[#374151]" />
        <ImageIcon className="w-4 h-4 text-[#374151]" />
        <Paperclip className="w-4 h-4 text-[#374151]" />

        <Input
          autoComplete="off"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Aa"
          className="flex-1 w-full border resize-none overflow-hidden bg-background"
        />
        <Button size={"icon"} variant={"ghost"} onClick={handleSend}>
          <Image
            src={"/assets/icons/send.svg"}
            alt="send"
            width={15}
            height={15}
          />
        </Button>
      </div>
    </>
  );
};

export default MessageContainer;
