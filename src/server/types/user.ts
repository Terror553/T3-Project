import type { RoleObj } from "./role";

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  salt: string;
  userAuthToken: string | null;
  avatarUrl: string;
  bannerUrl: string;
  signature: string;
  createdAt: Date;
  updatedAt: Date;
  roleId: number | null;
  userId: number | null;
  groups: RoleObj | null;
} | null;

export interface ForumUser {
  id: number;
  username: string;
  email: string;
  password: string;
  salt: string;
  userAuthToken?: string | null;
  avatarUrl: string;
  bannerUrl: string;
  signature: string;
  createdAt: Date;
  updatedAt: Date;
  roleId?: number | null;
  userId?: number | null;
}

export interface ForumMessages {
  id: number;
  createdAt: Date;
  message: string;
  title: string;
  seen: number;
  receiverId?: number | null;
  senderId?: number | null;
}

export interface ForumMessageReplies {
  id: number;
  createdAt: Date;
  message: string;
  seen: number;
  receiverId?: number | null;
  senderId?: number | null;
  messageId?: number | null;
}