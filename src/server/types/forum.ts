import type { ProfileWall, ProfileWallReply } from "./profile";

/**
 * Type for user groups
 */
export interface UserGroup {
  id: number;
  uuid: string;
  group_id: number;
}

/**
 * Type for user roles/groups
 */
export interface UserRole {
  id: number;
  name: string;
  color: string;
  default: number;
  team: number;
  high_team: number;
  priority: number;
  gradient: number;
  start?: string;
  end?: string;
  user_groups?: UserGroup[];
}

/**
 * Type for the `forum_user` model
 */
export interface ForumUser {
  id: number;
  username: string;
  email?: string; // Optional as it may not be exposed in all contexts
  avatarUrl: string;
  bannerUrl: string;
  signature: string;
  createdAt: Date;
  updatedAt: Date;
  topics?: ForumTopic[] | null;
  profileWalls?: ProfileWall[] | null;
  group: {
    name: string;
    default: number;
    id: number;
    color: string;
    team: number;
    highTeam: number;
    priority: number;
    gradient: number;
    start: string | null;
    end: string | null;
  } | null;
  password?: string; // Should only be available in specific server contexts
  salt?: string; // Should only be available in specific server contexts
}

/**
 * Type for forum reaction emojis
 */
export interface ForumReactionEmoji {
  id: number;
  name: string;
  emoji: string;
  negative: number;
}

/**
 * Type for forum reactions
 */
export interface ForumReaction {
  id: number;
  authorId: number;
  topicId: number;
  forum_reaction_emojis: ForumReactionEmoji;
}

/**
 * Type for topic follows
 */
export interface ForumTopicFollow {
  id: number;
  topicId: number;
  userId: number;
}

/**
 * Type for the `forum_topic_replies` model
 */
export interface ForumTopicReply {
  id: number;
  createdAt: Date;
  content: string;
  updatedAt: Date;
  authorId: number | null;
  topicIdId: number | null;
  forum_user: ForumUser;
}

/**
 * Type for the `forum_topics` model
 */
export interface ForumTopic {
  id: number;
  title: string;
  content: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  locked: number;
  pinned: number;
  authorId: number | null;
  subcategoryId: number | null;
  forum_topic_replies: ForumTopicReply[];
  forum_user: ForumUser;
  slug: string;
  count?: number;
  latestReply?: ForumTopicReply;
  forum_topic_follow?: ForumTopicFollow[];
  forum_reactions?: ForumReaction[];
}

/**
 * Type for the `forum_subcategory` model
 */
export interface ForumSubcategory {
  id: number;
  name: string;
  description: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  categoryId: number | null;
  slug: string;
  forum_topics: ForumTopic[];
  count: number;
  repliesCount: number;
  latestEntry: ForumTopic | null;
}

/**
 * Type for the `forum_category` model
 */
export interface ForumCategory {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  forum_subcategories: ForumSubcategory[];
}
