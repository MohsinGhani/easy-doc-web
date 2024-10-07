"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import SearchInput from "../SearchInput";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import ConversationSheet from "@/components/doctor/ConversationSheet";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { conversationThunks } from "@/lib/features/conversation/conversationThunks";
import { format } from "date-fns";

const MessagesSidebar = ({
  className,
  navigate = true,
}: {
  className?: string;
  navigate?: boolean;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { allConversations, Cloading } = useAppSelector(
    (state) => state.conversation
  );
  const userId = useAppSelector((state) => state.auth.user?.userId);

  const [filteredConversations, setFilteredConversations] =
    useState(allConversations);

  useEffect(() => {
    userId && dispatch(conversationThunks.fetchAllConversations());
  }, [dispatch, userId]);

  useEffect(() => {
    if (allConversations && allConversations.length) {
      const filtered = allConversations.filter(
        (conv) =>
          conv.metaData.patientName
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          conv.metaData.doctorName
            .toLowerCase()
            .includes(searchValue.toLowerCase())
      );
      setFilteredConversations(filtered);
    }
  }, [searchValue, allConversations]);

  const handleSheetOpen = (conversationId: string) => {
    setOpen(true);
    dispatch(conversationThunks.fetchConversationById(conversationId));
  };

  if (Cloading) {
    // Skeleton Loader while chats are loading
    return (
      <Card className={cn("w-full flex", className)}>
        <CardContent className="flex flex-col gap-6 w-full">
          {/* Skeleton for Search Input */}
          <div className="h-10 bg-gray-300 rounded-md w-full"></div>

          {/* Skeleton for Conversation List */}
          {[...Array(4)].map((_, index) => (
            <div key={index} className="space-y-4 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {/* Skeleton Avatar */}
                  <div className="rounded-full w-10 h-10 bg-gray-300"></div>

                  {/* Skeleton Text */}
                  <div className="space-y-1">
                    <div className="h-4 bg-gray-300 rounded w-32"></div>
                    <div className="h-3 bg-gray-300 rounded w-24"></div>
                  </div>
                </div>
                {/* Skeleton for Unread Badge */}
                <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
              </div>

              {/* Skeleton Separator */}
              {index !== 3 && <Separator className="w-[90%] mx-auto" />}
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className={cn("w-full flex", className)}>
        <CardContent className="flex flex-col gap-6 w-full">
          <SearchInput
            value={searchValue}
            setValue={setSearchValue}
            searchKey="conversations"
            autoComplete="off"
          />

          {filteredConversations &&
            filteredConversations.length > 0 &&
            filteredConversations.map((conv, i) => {
              const active = pathname.includes(conv.conversationId);

              return (
                <>
                  {navigate ? (
                    <Link key={i} href={`/messages/${conv.conversationId}`}>
                      <div
                        className={cn("space-y-4 cursor-pointer", {
                          "bg-slate-50 rounded-xl px-3 py-1": active,
                        })}
                      >
                        {!active && (
                          <span className="text-zinc-600 text-xs font-normal leading-none">
                            {format(conv.lastMessageAt, "hh:mm a")}
                          </span>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <div className="rounded-full w-10 h-10">
                              <Image
                                src={conv.metaData.patientProfilePicture}
                                alt="conv avatar"
                                className="rounded-full w-full h-full object-cover"
                                width={40}
                                height={40}
                              />
                            </div>

                            <div className="space-y-1">
                              <h2 className="text-base font-medium">
                                {conv.metaData.patientName}
                              </h2>

                              <div className="text-muted-foreground text-xs">
                                {conv.lastMessage ?? "Started a conversation"}
                              </div>
                            </div>
                          </div>

                          {conv.lastMessageRead && !active && (
                            <div className="w-3 h-3 bg-primary rounded-full flex items-center justify-center" />
                          )}
                        </div>
                      </div>

                      {i !== filteredConversations.length - 1 && (
                        <Separator className="mt-3 w-[90%] mx-auto" />
                      )}
                    </Link>
                  ) : (
                    <>
                      <div
                        className={cn("space-y-4 cursor-pointer", {
                          "bg-slate-50 rounded-xl px-3 py-1": active,
                        })}
                        onClick={() => {
                          handleSheetOpen(conv.conversationId);
                        }}
                      >
                        {!active && (
                          <span className="text-zinc-600 text-xs font-normal leading-none">
                            {format(conv.lastMessageAt, "hh:mm a")}
                          </span>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <div className="rounded-full w-10 h-10">
                              <Image
                                src={conv.metaData.patientProfilePicture}
                                alt="conv avatar"
                                className="rounded-full w-full h-full object-cover"
                                width={40}
                                height={40}
                              />
                            </div>

                            <div className="space-y-1">
                              <h2 className="text-base font-medium">
                                {conv.metaData.patientName}
                              </h2>

                              <div className="text-muted-foreground text-xs">
                                {conv.lastMessage ?? "Started a conversation"}
                              </div>
                            </div>
                          </div>

                          {conv.lastMessageRead && !active && (
                            <div className="w-3 h-3 bg-primary rounded-full flex items-center justify-center" />
                          )}
                        </div>
                      </div>

                      {i !== filteredConversations.length - 1 && (
                        <Separator className="w-[90%] mx-auto" />
                      )}
                    </>
                  )}
                </>
              );
            })}
        </CardContent>
      </Card>

      <ConversationSheet open={open} setOpen={setOpen} />
    </>
  );
};

export default MessagesSidebar;
