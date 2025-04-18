// Type for the `forum_topic_replies` model
export interface ForumTopicReply {
  id: number; // Unique identifier for the reply
  createdAt: Date; // Timestamp when the reply was created
  content: string; // Content of the reply
  updatedAt: Date; // Timestamp when the reply was last updated
  authorId: number | null; // ID of the user who authored the reply
  topicIdId: number | null; // ID of the topic this reply belongs to
}

// Type for the `forum_user` model
export interface ForumUser {
  id: number; // Unique identifier for the user
  username: string; // Username of the user
  avatar_url: string; // URL of the user's avatar
  signature: string; // User's signature
  createdAt: Date; // Timestamp when the user was created
  updatedAt: Date; // Timestamp when the user was last updated
  roleId: number | null; // ID of the user's role
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
}

// Type for the `forum_category` model
export interface ForumCategory {
  id: number; // Unique identifier for the category
  name: string; // Name of the category
  createdAt: Date; // Timestamp when the category was created
  updatedAt: Date; // Timestamp when the category was last updated
  forum_subcategory: ForumSubcategory[]; // Array of subcategories under this category
}
