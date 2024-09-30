"use client";

import { webSocketUrl } from "@/constants";
import useWebSocket from "@/hooks/useWebSocket";
import { useEffect } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";

const WebSocketInitializer = () => {
  const userId = Cookies.get("userId");

  const { connectionStatus, messages } = useWebSocket(
    `${webSocketUrl}/${userId}`
  );

  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      toast.info(`New notification: ${latestMessage.message}`);
    }
  }, [messages]);

  return (
    <div>
      <h1>WebSocket Notifications</h1>
      <p>WebSocket Status: {connectionStatus}</p>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketInitializer;
