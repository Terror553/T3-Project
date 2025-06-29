/**
 * Forum-related type definitions based on Prisma schema
 */
import type { BaseModel, FullTimestampedModel } from "./base";
import type { RoleObj } from "./role";
import type { User } from "./user";

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

  // Optional relations
  group?: RoleObj;
  user?: User;
  sentMessageReplies?: ForumMessageReply[];
  receivedMessageReplies?: ForumMessageReply[];
  receivedMessages?: ForumMessage[];
  sentMessages?: ForumMessage[];
  navigations?: ForumNavigation[];
  reactionEmojis?: ForumReactionEmoji[];
  reactions?: ForumReaction[];
  topicFollows?: ForumTopicFollow[];
  topicReactions?: ForumTopicReaction[];
  topicReplies?: ForumTopicReply[];
  topicReplyReactions?: ForumTopicReplyReaction[];
  topics?: ForumTopic[];
  profileWalls?: ProfileWall[];
  userWalls?: ProfileWall[];
  profileWallReplies?: ProfileWallReply[];
  wikiCategories?: WikiCategory[];
  wikiSubCategories?: WikiSubCategory[];
}

/**
 * Type for forum verification
 */
export interface ForumVerification extends BaseModel {
  forumId: number;
  verifyCode: string;
}

/**
 * Type for forum categories
 */
export interface ForumCategory extends FullTimestampedModel {
  name: string;

  // Relations
  subcategories?: ForumSubcategory[];
}

/**
 * Type for forum subcategories
 */
export interface ForumSubcategory extends FullTimestampedModel {
  name: string;
  description: string;
  status: number;
  categoryId: number | null;
  slug: string;

  // Relations
  category?: ForumCategory | null;
  topics?: ForumTopic[];

  // Additional calculated fields
  count?: number;
  repliesCount?: number;
  latestEntry?: ForumTopic | null;
}

/**
 * Type for forum topics
 */
export interface ForumTopic extends FullTimestampedModel {
  title: string;
  content: string;
  status: number;
  locked: number;
  pinned: number;
  authorId: number | null;
  subcategoryId: number | null;
  slug: string | null;

  // Relations
  author?: ForumUser | null;
  subcategory?: ForumSubcategory | null;
  reactions?: ForumReaction[];
  follows?: ForumTopicFollow[];
  topicReactions?: ForumTopicReaction[];
  replies?: ForumTopicReply[];

  // Additional calculated fields
  count?: number;
  latestReply?: ForumTopicReply;
}

/**
 * Type for forum topic follows
 */
export interface ForumTopicFollow extends BaseModel {
  userId: number | null;
  topicId: number | null;

  // Relations
  user?: ForumUser | null;
  topic?: ForumTopic | null;
}

/**
 * Type for forum topic replies
 */
export interface ForumTopicReply extends FullTimestampedModel {
  content: string;
  authorId: number | null;
  topicId: number | null;

  // Relations
  author?: ForumUser | null;
  topic?: ForumTopic | null;
  replyReactions?: ForumTopicReplyReaction[];
}

/**
 * Type for forum reaction emojis
 */
export interface ForumReactionEmoji extends BaseModel {
  createdAt: Date;
  emoji: string;
  negative: number;
  authorId: number | null;
  name: string;

  // Relations
  author?: ForumUser | null;
  reactions?: ForumReaction[];
  topicReactions?: ForumTopicReaction[];
  topicReplyReactions?: ForumTopicReplyReaction[];
}

/**
 * Type for forum reactions
 */
export interface ForumReaction extends BaseModel {
  createdAt: Date;
  authorId: number | null;
  reactionId: number | null;
  topicId: number | null;

  // Relations
  author?: ForumUser | null;
  topic?: ForumTopic | null;
  emoji?: ForumReactionEmoji | null;
}

/**
 * Type for forum topic reactions
 */
export interface ForumTopicReaction extends BaseModel {
  createdAt: Date;
  authorId: number | null;
  reactionId: number | null;
  topicId: number | null;

  // Relations
  author?: ForumUser | null;
  topic?: ForumTopic | null;
  emoji?: ForumReactionEmoji | null;
}

/**
 * Type for forum topic reply reactions
 */
export interface ForumTopicReplyReaction extends BaseModel {
  createdAt: Date;
  authorId: number | null;
  reactionId: number | null;
  replyId: number | null;

  // Relations
  author?: ForumUser | null;
  reply?: ForumTopicReply | null;
  emoji?: ForumReactionEmoji | null;
}

/**
 * Type for forum messages
 */
export interface ForumMessage extends BaseModel {
  createdAt: Date;
  message: string;
  title: string;
  seen: number;
  receiverId: number | null;
  senderId: number | null;

  // Relations
  receiver?: ForumUser | null;
  sender?: ForumUser | null;
  messageReplies?: ForumMessageReply[];
}

/**
 * Type for forum message replies
 */
export interface ForumMessageReply extends BaseModel {
  createdAt: Date;
  message: string;
  seen: number;
  receiverId: number | null;
  senderId: number | null;
  messageId: number | null;

  // Relations
  receiver?: ForumUser | null;
  sender?: ForumUser | null;
  forumMessage?: ForumMessage | null;
}

/**
 * Type for forum navigation items
 */
export interface ForumNavigation extends FullTimestampedModel {
  name: string;
  icon: string;
  fullLink: string;
  authorId: number | null;
  teamLink: number;

  // Relations
  author?: ForumUser | null;
}

// Forward reference declarations for related types
export interface ProfileWall extends BaseModel {}
export interface ProfileWallReply extends BaseModel {}
export interface WikiCategory extends BaseModel {}
export interface WikiSubCategory extends BaseModel {}
