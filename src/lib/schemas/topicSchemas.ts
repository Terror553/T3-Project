import { z } from "zod";

export const createTopicSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(10).max(10000),
  subcategory: z.string({ message: "Subcategory must be a valid UUID" }),
});

export const editTopicSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(10).max(1000),
  id: z.number().int().nullable(),
  slug: z.string().nullable(),
});

export const deleteTopicSchema = z.object({
  id: z.number().int().nullable(),
  slug: z.string().nullable(),
});

export const createReplySchema = z.object({
  content: z.string().min(1).max(10000),
  topicId: z.number().int().nullable().optional(),
  slug: z.string().nullable().optional(),
});

export const editReplySchema = z.object({
  id: z.number().int().nullable(),
  content: z.string().min(1).max(10000),
  topicId: z.number().int().nullable().optional(),
});

export const deleteReplySchema = z.object({
  id: z.number().int().nullable(),
  topicId: z.number().int().nullable().optional(),
});

export const reactSchema = z.object({
  reactionId: z.number().int(),
  topicId: z.number().int().nullable().optional(),
  slug: z.string().nullable().optional(),
});

export const followSchema = z.object({
  topicId: z.number().int().nullable().optional(),
  slug: z.string().nullable().optional(),
});
