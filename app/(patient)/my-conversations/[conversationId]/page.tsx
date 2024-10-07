"use client";

import MessageContainer from "@/components/conversations/MessageContainer";

export default function MyConversationDetailsPage({
  params: { conversationId },
}: {
  params: { conversationId: string };
}) {
  return (
    <>
      <MessageContainer
        conversationId={conversationId}
        href="my-conversations"
      />
    </>
  );
}
