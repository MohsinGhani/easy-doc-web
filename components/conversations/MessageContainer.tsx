"use client";

import { ArrowLeft, Phone, Video } from "lucide-react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import MessageCard from "@/components/conversations/MessageCard";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import AddANote from "./AddANote";
import SendMessageButton from "./SendMessageButton";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useCallback, useEffect, useRef } from "react";
import { conversationThunks } from "@/lib/features/conversation/conversationThunks";
import EmptyState from "@/components/common/EmptyState";
import {
  ConversationSkeletonOne,
  ConversationSkeletonTwo,
} from "@/components/skeletons/conversations";

interface MessageContainerProps {
  conversationId?: string;
  href?: string;
  handleClose?: () => void;
  className?: string;
}

const MessageContainer = ({
  conversationId,
  href = "conversations",
  handleClose,
  className,
}: MessageContainerProps) => {
  const dispatch = useAppDispatch();
  const { fetchedConversation, Cloading, MlastEvaluatedKey } = useAppSelector(
    (state) => state.conversation
  );
  const { userId, role } = useAppSelector((state) => state.auth.user);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // Function to handle the scroll event
  const handleScroll = useCallback(() => {
    const scrollTop = messageContainerRef.current?.scrollTop;
    if (scrollTop === 0 && MlastEvaluatedKey) {
      // Dispatch action to load more messages when scroll reaches the top
      dispatch(
        conversationThunks.fetchMoreMessages({
          conversationId,
          MlastEvaluatedKey,
        })
      );
      console.log("feteching more messages");
    }
  }, [conversationId, dispatch, MlastEvaluatedKey]);

  useEffect(() => {
    const messageContainer = messageContainerRef.current;
    if (messageContainer) {
      messageContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (messageContainer) {
        messageContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    userId &&
      role &&
      conversationId &&
      dispatch(conversationThunks.fetchConversationById(conversationId));
  }, [conversationId, userId, role]);

  if (Cloading) return <ConversationSkeletonTwo />;

  if (!fetchedConversation && !Cloading && userId && role) {
    return (
      <EmptyState
        title="No conversation found"
        buttonText="Back to Conversations"
      />
    );
  }

  return (
    <ScrollArea className="[&>div>div[style]]:!block relative w-full h-full">
      <div
        className={cn(
          "flex items-center lg:gap-4 sm:gap-3 gap-1 lg:py-[33px] lg:px-[47px] sm:px5 sm:py-5 px-4 py-3 bg-white",
          className
        )}
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
            src={
              fetchedConversation?.metaData.patientProfilePicture ||
              "https://via.placeholder.com/50x50"
            }
            alt="avatar"
            width={50}
            height={50}
          />
          <div className="flex-col justify-center items-start gap-1 inline-flex">
            <div className="text-zinc-900 sm:text-2xl text-sm sm:font-medium font-bold">
              {fetchedConversation?.metaData.patientName || "Annette Black"}
            </div>
            <div className="text-muted-foreground md:text-base text-sm font-normal sm:block leading-none hidden">
              {/* TODO: this is not a good way */}
              London , UK
            </div>
          </div>
        </div>
        <div className="justify-start items-center sm:gap-4 gap-1 flex">
          <div className="md:w-12 w-10 md:h-12 h-10 bg-secondary flex items-center justify-center rounded-full cursor-pointer">
            <Video className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="md:w-12 w-10 md:h-12 h-10 bg-secondary flex items-center justify-center rounded-full cursor-pointer">
            <Phone className="w-6 h-6 text-muted-foreground" />
          </div>
        </div>
      </div>

      {role === "doctor" && <AddANote />}

      <div className="lg:py-6 md:py-4 py-2 lg:px-12 md:px-6 px-4 max-h-[calc(100vh-56px-32px-20px-24px-200px)] overflow-y-auto">
        <p className="text-black text-sm font-normal text-center mb-[30px]">
          Yesterday
        </p>

        <div
          className="relative flex flex-col gap-4 grow mb-20"
          ref={messageContainerRef}
        >
          {fetchedConversation?.messages?.map((message, i) => (
            <MessageCard key={i} message={message} />
          ))}
        </div>

        <SendMessageButton
          nonSticky={href === "conversations" || href === "my-conversations"}
        />
      </div>
    </ScrollArea>
  );
};

export default MessageContainer;
