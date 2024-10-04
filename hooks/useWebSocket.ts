"use client";

import { Message } from "@/types/chat";
import { useEffect, useState, useRef } from "react";

interface WebSocketMessage extends Partial<Message> {
  [key: string]: any; // Allow any other properties
}

const useWebSocket = (webSocketUrl: string) => {
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const ws = useRef<WebSocket | null>(null); // WebSocket reference

  // Function to send data to the backend
  const sendMessage = (message: WebSocketMessage) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    } else {
      console.error("WebSocket is not open. Unable to send message.");
    }
  };

  useEffect(() => {
    const connect = () => {
      ws.current = new WebSocket(webSocketUrl);

      ws.current.onopen = () => {
        setConnectionStatus("Connected");
        console.log("WebSocket connected");
      };

      ws.current.onmessage = (event: MessageEvent) => {
        const data: WebSocketMessage = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, data]);
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
  }, [webSocketUrl]);

  return { connectionStatus, messages, sendMessage };
};

export default useWebSocket;
