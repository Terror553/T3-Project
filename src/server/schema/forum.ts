import { z } from "zod";

export const forumUserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  salt: z.string(),
  userAuthToken: z.string().nullable(),
  avatarUrl: z.string().default("default.png"),
  bannerUrl: z.string().default("default.png"),
  signature: z.string().default(""),
  createdAt: z.date(),
  updatedAt: z.date(),
  roleId: z.number().nullable(),
  userId: z.number().nullable(),
});

export const forumCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  subcategories: z.array(z.lazy(() => forumSubcategorySchema)).optional(),
});

export const forumSubcategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  status: z.number(),
  categoryId: z.number().nullable(),
  slug: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  count: z.number().optional(),
  repliesCount: z.number().optional(),
});

export const forumTopicSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  status: z.number(),
  locked: z.number(),
  pinned: z.number(),
  authorId: z.number().nullable(),
  subcategoryId: z.number().nullable(),
  slug: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const forumTopicReplySchema = z.object({
  id: z.number(),
  content: z.string(),
  authorId: z.number().nullable(),
  topicId: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const forumReactionEmojiSchema = z.object({
  id: z.number(),
  emoji: z.string(),
  name: z.string(),
  negative: z.number(),
  authorId: z.number().nullable(),
  createdAt: z.date(),
});
