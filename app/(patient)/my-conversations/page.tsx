"use client";

import MessagesSidebar from "@/components/conversations/conversations-sidebar";
import React from "react";

export default function MyDoctorConversationsPage() {
  return (
    <>
      <MessagesSidebar className="lg:hidden h-full" />
      <div className="w-full h-full lg:flex hidden items-center justify-center">
        <h1 className="text-xl text-muted-foreground text-center">
          Select a Conversation to view
        </h1>
      </div>
    </>
  );
}
