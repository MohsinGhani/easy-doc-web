"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import SearchInput from "../SearchInput";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Chat, chats } from "@/types/chat";
import ChatSheet from "../doctor/ChatSheet";

const MessagesSidebar = ({
  className,
  navigate = true,
}: {
  className?: string;
  navigate?: boolean;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredChats, setFilteredChats] = useState(chats);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const filtered = chats.filter((chat) =>
      chat.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredChats(filtered);
  }, [searchValue]);

  return (
    <>
      <Card className={cn("w-full flex", className)}>
        <CardContent className="flex flex-col gap-6 w-full">
          <SearchInput
            value={searchValue}
            setValue={setSearchValue}
            searchKey="name"
          />

          {filteredChats.map((chat, i) => {
            const active = pathname.includes(chat.chatId);

            return (
              <>
                {navigate ? (
                  <Link key={i} href={`/messages/${chat.chatId}`}>
                    <div
                      className={cn("space-y-4 cursor-pointer", {
                        "bg-slate-50 rounded-xl px-3 py-1": active,
                      })}
                    >
                      {!active && (
                        <span className="text-zinc-600 text-xs font-normal leading-none">
                          Today, 08:30 am - 10:30 am
                        </span>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <div className="rounded-full w-10 h-10">
                            <Image
                              src={chat.avatar}
                              alt="chat avatar"
                              className="rounded-full w-full h-full object-cover"
                              width={40}
                              height={40}
                            />
                          </div>

                          <div className="space-y-1">
                            <h2 className="text-base font-medium">
                              {chat.name}
                            </h2>

                            <div className="text-muted-foreground text-xs">
                              Sent a picture
                            </div>
                          </div>
                        </div>

                        {!active && (
                          <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center">
                            3
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator className="mt-6 w-[90%]" />
                  </Link>
                ) : (
                  <>
                    <div
                      className={cn("space-y-4 cursor-pointer", {
                        "bg-slate-50 rounded-xl px-3 py-1": active,
                      })}
                      onClick={() => {
                        setSelectedChat(chat);
                        setOpen(true);
                      }}
                    >
                      {!active && (
                        <span className="text-zinc-600 text-xs font-normal leading-none">
                          Today, 08:30 am - 10:30 am
                        </span>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <div className="rounded-full w-10 h-10">
                            <Image
                              src={chat.avatar}
                              alt="chat avatar"
                              className="rounded-full w-full h-full object-cover"
                              width={40}
                              height={40}
                            />
                          </div>

                          <div className="space-y-1">
                            <h2 className="text-base font-medium">
                              {chat.name}
                            </h2>

                            <div className="text-muted-foreground text-xs">
                              Sent a picture
                            </div>
                          </div>
                        </div>

                        {!active && (
                          <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center">
                            3
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator className="mt-6 w-[90%]" />
                  </>
                )}
              </>
            );
          })}
        </CardContent>
      </Card>

      <ChatSheet chat={selectedChat} open={open} setOpen={setOpen} />
    </>
  );
};

export default MessagesSidebar;
