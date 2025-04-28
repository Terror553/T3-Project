// Type for the `forum_topic_replies` model
export interface ForumTopicReply {
  id: number; // Unique identifier for the reply
  createdAt: Date; // Timestamp when the reply was created
  content: string; // Content of the reply
  updatedAt: Date; // Timestamp when the reply was last updated
  authorId: number | null; // ID of the user who authored the reply
  topicIdId: number | null; // ID of the topic this reply belongs to
  forum_user: ForumUser; // User who authored the reply
}

// Type for the `forum_user` model
export interface ForumUser {
  id: number; // Unique identifier for the user
  username: string; // Username of the user
  avatar_url: string; // URL of the user's avatar
  signature: string; // User's signature
  createdAt: Date; // Timestamp when the user was created
  updatedAt: Date; // Timestamp when the user was last updated
  groups: {
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
  };
}

export interface UserGroup {
  id: number;
  uuid: string;
  group_id: number;
}

// Type for the `forum_topics` model
export interface ForumTopic {
  id: number; // Unique identifier for the topic
  title: string; // Title of the topic
  content: string; // Content of the topic
  status: number; // Status of the topic (e.g., active, locked)
  createdAt: Date; // Timestamp when the topic was created
  updatedAt: Date; // Timestamp when the topic was last updated
  locked: number; // Whether the topic is locked (0 = no, 1 = yes)
  pinned: number; // Whether the topic is pinned (0 = no, 1 = yes)
  authorId: number | null; // ID of the user who authored the topic
  subcategoryId: number | null; // ID of the subcategory this topic belongs to
  forum_topic_replies: ForumTopicReply[]; // Array of replies to this topic
  forum_user: ForumUser; // User who authored the topic
  slug: string; // URL-friendly identifier for the topic
  count?: number; // Optional count of replies in this topic
  latestReply: ForumTopicReply;
  forum_topic_follow: ForumTopicFollow[];
  forum_reactions: ForumReaction[]; // Array of reactions to this topic
}

export interface ForumReaction {
  id: number;
  authorId: number;
  topicId: number;
  forum_reaction_emojis: ForumReactionEmoji;
}

export interface ForumReactionEmoji {
  id: number;
  name: string;
  emoji: string;
  negative: number;
}

export interface ForumTopicFollow {
  id: number;
  topicId: number;
  userId: number;
}

// Type for the `forum_subcategory` model
export interface ForumSubcategory {
  id: number; // Unique identifier for the subcategory
  name: string; // Name of the subcategory
  description: string; // Description of the subcategory
  status: number; // Status of the subcategory (e.g., active, inactive)
  createdAt: Date; // Timestamp when the subcategory was created
  updatedAt: Date; // Timestamp when the subcategory was last updated
  categoryId: number | null; // ID of the category this subcategory belongs to
  slug: string; // URL-friendly identifier for the subcategory
  forum_topics: ForumTopic[]; // Array of topics under this subcategory
  count: number; // Optional count of topics in this subcategory
  repliesCount: number; // Optional count of replies in this subcategory
  latestEntry: ForumTopic | null;
}

// Type for the `forum_category` model
export interface ForumCategory {
  id: number; // Unique identifier for the category
  name: string; // Name of the category
  createdAt: Date; // Timestamp when the category was created
  updatedAt: Date; // Timestamp when the category was last updated
  forum_subcategories: ForumSubcategory[]; // Array of subcategories under this category
}
