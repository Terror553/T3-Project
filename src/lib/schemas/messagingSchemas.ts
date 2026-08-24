import { z } from "zod";

export const createMessageThreadSchema = z.object({
  receiverId: z.number().int().positive(),
  title: z.string().min(3).max(200),
  message: z.string().min(1).max(10000),
});

export const replyMessageSchema = z.object({
  messageId: z.number().int().positive(),
  message: z.string().min(1).max(10000),
});
