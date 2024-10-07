"use client";

import { webSocketUrl } from "@/constants";
import useWebSocket from "@/hooks/useWebSocket";
import { useEffect } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";

const WebSocketInitializer = () => {
  const userId = Cookies.get("userId");

  const { messages } = useWebSocket(`${webSocketUrl}?userId=${userId}`);

  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      toast.info(
        `New notification: ${latestMessage.message ?? latestMessage.title}`
      );
    }
  }, [messages]);

  return <div />;
};

export default WebSocketInitializer;
