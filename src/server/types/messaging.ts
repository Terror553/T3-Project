import type { ForumUser } from "./forum";

export interface MessageReplyView {
  id: number;
  createdAt: Date;
  message: string;
  seen: number;
  messageId: number | null;
  senderId: number | null;
  receiverId: number | null;
  sender: ForumUser | null;
  receiver: ForumUser | null;
}

export interface MessageThreadView {
  id: number;
  createdAt: Date;
  message: string;
  title: string;
  seen: number;
  senderId: number | null;
  receiverId: number | null;
  sender: ForumUser | null;
  receiver: ForumUser | null;
  messageReplies: MessageReplyView[];
}
