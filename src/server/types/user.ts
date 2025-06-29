/**
 * User type definitions based on Prisma schema
 */
import type { BaseModel, FullTimestampedModel, UuidModel } from "./base";
import type { Group } from "./role";

/**
 * Type for MC server users
 */
export interface User extends BaseModel, UuidModel {
  clan: string | null;
  money: number;
  firstJoined: Date;
  lastJoined: Date;
  playtime: bigint;
  forumId: number | null;

  // Relations
  forumUser?: ForumUser | null;
  userPermissions?: UserPermission[];
}

/**
 * Type for forum users
 */
export interface ForumUser extends FullTimestampedModel {
  username: string;
  email: string;
  password: string;
  salt: string;
  userAuthToken: string | null;
  avatarUrl: string;
  bannerUrl: string;
  signature: string;
  roleId: number | null;
  userId: number | null;

  // Relations
  group?: Group | null;
  user?: User | null;
}

/**
 * Type for user permissions
 */
export interface UserPermission extends BaseModel {
  uuid: string;
  userId: number;
  permission: string;
  permissionActivated: boolean;

  // Relations
  user?: User;
}

/**
 * Type for forum messages
 */
export interface ForumMessages {
  id: number;
  createdAt: Date;
  message: string;
  title: string;
  seen: number;
  receiverId?: number | null;
  senderId?: number | null;
}

/**
 * Type for forum message replies
 */
export interface ForumMessageReplies {
  id: number;
  createdAt: Date;
  message: string;
  seen: number;
  receiverId?: number | null;
  senderId?: number | null;
  messageId?: number | null;
}
