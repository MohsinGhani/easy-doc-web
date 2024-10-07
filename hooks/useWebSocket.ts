"use client";

import { updateMessages } from "@/lib/features/conversation/conversationSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect, useState, useRef } from "react";

interface WebSocketMessage extends Partial<Message> {
  [key: string]: any; // Allow any other properties
}

const useWebSocket = (webSocketUrl: string) => {
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const ws = useRef<WebSocket | null>(null); // WebSocket reference
  const dispatch = useAppDispatch();

  useEffect(() => {
    const connect = () => {
      ws.current = new WebSocket(webSocketUrl);

      ws.current.onopen = () => {
        setConnectionStatus("Connected");
        console.log("WebSocket connected");
      };

      ws.current.onmessage = (event: MessageEvent) => {
        const data: WebSocketMessage = JSON.parse(event.data);
        if (data?.type && data?.type === "NEW_MESSAGE") {
          dispatch(updateMessages(data.message as Message));
          setMessages((prevMessages) => [...prevMessages, data.title]);
        } else {
          setMessages((prevMessages) => [...prevMessages, data]);
        }
        console.log("Received message:", data);
      };

      ws.current.onclose = () => {
        setConnectionStatus("Disconnected");
        console.log("WebSocket disconnected. Attempting to reconnect...");
        setTimeout(connect, 5000); // Reconnect after 5 seconds
      };

      ws.current.onerror = (error: Event) => {
        console.error("WebSocket error:", error);
      };
    };

    connect();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
    /* TODO: check if this not causes an error */
  }, [webSocketUrl, dispatch]);

  return { connectionStatus, messages };
};

export default useWebSocket;
