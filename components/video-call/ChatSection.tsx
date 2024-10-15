// components/ChatSection.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Send } from "lucide-react";

interface ChatSectionProps {
  chatLog: { sender: string; message: string }[];
  sendMessage: (message: string) => void;
  setChatLog: React.Dispatch<
    React.SetStateAction<
      {
        sender: string;
        message: string;
      }[]
    >
  >;
}

const ChatSection: React.FC<ChatSectionProps> = ({
  chatLog,
  setChatLog,
  sendMessage,
}) => {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (message.trim()) {
      const newMsg = sendMessage(message);
      if (newMsg !== undefined) {
        setChatLog((prev) => [...prev, newMsg]);
        setMessage("");
      }
    }
  };

  return (
    <Card className="h-full flex flex-col md:w-1/4">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Conversation</CardTitle>
      </CardHeader>

      {/* Chat Log */}
      <CardContent className="overflow-y-auto flex-grow bg-gray-100 mb-4 max-h-64 md:max-h-full">
        {chatLog.map((msg, idx) => (
          <p key={idx} className="mb-2 text-gray-800">
            <span className="font-semibold text-gray-700">{msg.sender}:</span>{" "}
            {msg.message}
          </p>
        ))}
      </CardContent>

      {/* Input and Send Button */}
      <CardFooter className="flex items-center gap-3">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter a message"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button onClick={handleSend} size={"icon"}>
          <Send className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChatSection;
