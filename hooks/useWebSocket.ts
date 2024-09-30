import { useEffect, useState } from "react";

interface WebSocketMessage {
  [key: string]: any; // TODO:Adjust this to match the structure of your WebSocket messages
}

const useWebSocket = (webSocketUrl: string) => {
  const [connectionStatus, setConnectionStatus] =
    useState<string>("Disconnected");
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);

  useEffect(() => {
    let ws: WebSocket;

    const connect = () => {
      ws = new WebSocket(webSocketUrl);

      ws.onopen = () => {
        setConnectionStatus("Connected");
        console.log("WebSocket connected");
      };

      ws.onmessage = (event: MessageEvent) => {
        const data: WebSocketMessage = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, data]);
        console.log("Received message:", data);
      };

      ws.onclose = () => {
        setConnectionStatus("Disconnected");
        console.log("WebSocket disconnected. Attempting to reconnect...");
        setTimeout(connect, 5000); // Reconnect after 5 seconds
      };

      ws.onerror = (error: Event) => {
        console.error("WebSocket error:", error);
      };
    };

    connect();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [webSocketUrl]);

  return { connectionStatus, messages };
};

export default useWebSocket;
