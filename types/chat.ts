export interface Chat {
  chatId: string;
  messages: Message[];
  avatar: string;
  name: string;
}

export interface Message {
  senderId: string;
  messageId: string;
  text?: string;
  recipientUserId: string;
  timestamp: number;
  attachments: Attachment[];
  isRead: boolean;
}
