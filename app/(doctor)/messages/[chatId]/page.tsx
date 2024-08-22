"use client";

import MessageContainer from "@/components/messages/MessageContainer";

export default function ChatDetailsPage({
  params: { chatId },
}: {
  params: { chatId: string };
}) {
  return (
    <>
      <MessageContainer chatId={chatId} />
    </>
  );
}
