import MessagesSidebar from "@/components/conversations/conversations-sidebar";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Easy Doc | Doctor Conversations",
  description: "Here you can view all your conversations",
};

export default function DoctorConversationsPage() {
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
