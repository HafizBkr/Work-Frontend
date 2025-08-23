export type Conversation = {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  lastTime: string;
  unread?: number;
  pinned?: boolean;
};

export type Message = {
  id: number;
  sender: string;
  content: string;
  time: string;
  avatar?: string;
  color?: string;
};

export type ConversationData = {
  id: string;
  name: string;
  members: number;
  online: number;
  messages: Message[];
};
