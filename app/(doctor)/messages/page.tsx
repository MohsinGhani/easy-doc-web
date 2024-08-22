"use client";

import MessagesSidebar from "@/components/messages/messages-sidebar";

export default function PatientsReviewaPage() {
  return (
    <>
      <MessagesSidebar className="lg:hidden flex w-full" />

      <div className="lg:flex items-center justify-center">
        <h1 className="text-xl text-muted-foreground text-center">Select a Chat to view</h1>
      </div>
    </>
  );
}
