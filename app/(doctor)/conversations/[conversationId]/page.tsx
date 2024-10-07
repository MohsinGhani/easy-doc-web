"use client";

import MessageContainer from "@/components/conversations/MessageContainer";

export default function ConversationDetailsPage({
  params: { conversationId },
}: {
  params: { conversationId: string };
}) {
  return (
    <>
      <MessageContainer conversationId={conversationId} href="conversations" />
    </>
  );
}
