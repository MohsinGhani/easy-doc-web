export interface Attachment {
  name: string;
  url: string;
  mimeType: string;
  size: string;
}

export interface Author {
  userId: string;
}

export interface Chat {
  chatId: string;
  messages: Message[];
  avatar: string;
  name: string;
}

export interface Message {
  text: string;
  author: Author;
  attachments: Attachment[];
  replies: Reply[];
}

export interface Reply {
  author: Author;
  text: string;
}

export const chats: Chat[] = [
  {
    chatId: Math.random().toString(36).substring(2, 22),
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "Ashwind Khanna",
    messages: [
      {
        author: {
          userId: "f1f3cdfa-b061-70c4-1c86-e71cb5f39ae7a",
        },
        text: "Hey, Aasil",
        attachments: [
          {
            name: "Zaki.png",
            url: "https://randomuser.me/api/portraits/men/1.jpg",
            mimeType: "Png",
            size: "2MB",
          },
        ],
        replies: [
          {
            author: {
              userId: "f1f3cdfa-b061-70c4-1c86-e71cb5f39ae7",
            },
            text: "Hey, Jakob",
          },
        ],
      },
      {
        author: {
          userId: "f1f3cdfa-b061-70c4-1c86-e71cb5f39ae7",
        },
        text: "Hey, Aasil",
        attachments: [],
        replies: [],
      },
    ],
  },
  {
    chatId: Math.random().toString(36).substring(2, 22),
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "Jane Doe",
    messages: [
      {
        author: {
          userId: "f1f3cdfa-b061-70c4-1c86-e71cb5f39ae7",
        },
        text: "Hey, Aasil",
        attachments: [
          {
            name: "Zaki.png",
            url: "https://randomuser.me/api/portraits/men/1.jpg",
            mimeType: "Png",
            size: "2MB",
          },
        ],
        replies: [
          {
            author: {
              userId: "f1f3cdfa-b061-70c4-1c86-e71cb5f39ae7",
            },
            text: "Hey, Jakob",
          },
        ],
      },
      {
        author: {
          userId: "f1f3cdfa-b061-70c4-1c86-e71cb5f39ae7",
        },
        text: "Hey, Aasil",
        attachments: [
          {
            name: "Zaki.png",
            url: "https://randomuser.me/api/portraits/men/1.jpg",
            mimeType: "Png",
            size: "2MB",
          },
        ],
        replies: [
          {
            author: {
              userId: "f1f3cdfa-b061-70c4-1c86-e71cb5f39ae7",
            },
            text: "Hey, Jakob",
          },
        ],
      },
    ],
  },
];
