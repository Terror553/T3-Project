/**
 * Profile-related type definitions based on Prisma schema
 */
import type { BaseModel, FullTimestampedModel } from "./base";
import type { ForumUser } from "./user";

/**
 * Type for profile walls
 */
export interface ProfileWall extends FullTimestampedModel {
  content: string;
  userId: number | null;
  profileId: number | null;

  // Relations
  user?: ForumUser | null;
  profile?: ForumUser | null;
  replies?: ProfileWallReply[];
}

/**
 * Type for profile wall replies
 */
export interface ProfileWallReply extends FullTimestampedModel {
  content: string;
  userId: number | null;
  postId: number | null;

  // Relations
  user?: ForumUser | null;
  profileWall?: ProfileWall | null;
}

/**
 * Type for profile banners
 */
export interface ProfileBanner extends BaseModel {
  name: string;
  url: string;
}
