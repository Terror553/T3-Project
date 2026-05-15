"use server";

import DOMPurify from "isomorphic-dompurify";
import { db } from "~/server/db";
import {
  createErrorResult,
  createSuccessResult,
  ErrorCode,
  type AppResult,
} from "~/utils/errorHandler";
import { messageSchema } from "~/lib/schemas/messageSchema";
import type { z } from "zod";
import { getCurrentUser } from "../utils/currentUser";

export async function sendMessageReply(
  unsafeData: z.infer<typeof messageSchema>,
): Promise<AppResult<{ id: number }>> {
  // Validate input data
  const validationResult = messageSchema.safeParse(unsafeData);

  if (!validationResult.success) {
    return createErrorResult("Invalid input data.", ErrorCode.VALIDATION_ERROR);
  }
  const data = validationResult.data;

  try {
    // Find user by email
    const user = await getCurrentUser();

    // Check if user exists
    if (!user) {
      return createErrorResult(
        "You need to be signed in to send a message.",
        ErrorCode.INVALID_CREDENTIALS,
      );
    }

    data.message = DOMPurify.sanitize(data.message);

    const originalMessage = await db.forumMessage.findUnique({
      where: { id: data.id },
      select: { sender: { select: { id: true } } },
    });

    if (!originalMessage) {
      return createErrorResult(
        "Original message not found.",
        ErrorCode.NOT_FOUND,
      );
    }

    const newMessageReply = await db.forumMessageReply.create({
      data: {
        message: data.message,
        forumMessage: {
          connect: {
            id: data.id,
          },
        },
        sender: {
          connect: {
            id: user.id,
          },
        },
        receiver: {
          connect: {
            id: originalMessage.sender?.id,
          },
        },
      },
    });

    return createSuccessResult({
      id: newMessageReply.id,
    });
  } catch (error) {
    console.error("Error during message reply creation:", error);
    return createErrorResult(
      data.message + "An unexpected error occurred, " + error,
      ErrorCode.SERVER_ERROR,
    );
  }
}
