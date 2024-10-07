"use client";

import MessageContainer from "@/components/messages/MessageContainer";

export default function ChatDetailsPage({
  params: { conversationId },
}: {
  params: { conversationId: string };
}) {
  return (
    <>
      <MessageContainer conversationId={conversationId} className="w-full h-full" />
    </>
  );
}
