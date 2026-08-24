"use server";

import DOMPurify from "isomorphic-dompurify";
import type { z } from "zod";
import {
  createMessageThreadSchema,
  replyMessageSchema,
} from "~/lib/schemas/messagingSchemas";
import { getCurrentUser } from "~/server/auth/utils/currentUser";
import { db } from "~/server/db";
import {
  createErrorResult,
  createSuccessResult,
  ErrorCode,
  type AppResult,
} from "~/utils/errorHandler";
import type { MessageThreadView } from "../types/messaging";

function ensureUserCanAccessThread(
  userId: number,
  senderId: number | null,
  receiverId: number | null,
): boolean {
  return senderId === userId || receiverId === userId;
}

export async function getInboxMessages(): Promise<MessageThreadView[]> {
  const user = await getCurrentUser();
  if (!user) {
    return [];
  }

  const messages = await db.forumMessage.findMany({
    where: {
      OR: [{ senderId: user.id }, { receiverId: user.id }],
    },
    include: {
      sender: {
        include: {
          group: true,
        },
      },
      receiver: {
        include: {
          group: true,
        },
      },
      messageReplies: {
        include: {
          sender: {
            include: {
              group: true,
            },
          },
          receiver: {
            include: {
              group: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return messages as unknown as MessageThreadView[];
}

export async function getMessageThread(
  messageId: number,
): Promise<MessageThreadView | null> {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  const message = await db.forumMessage.findUnique({
    where: { id: messageId },
    include: {
      sender: {
        include: {
          group: true,
        },
      },
      receiver: {
        include: {
          group: true,
        },
      },
      messageReplies: {
        include: {
          sender: {
            include: {
              group: true,
            },
          },
          receiver: {
            include: {
              group: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!message) {
    return null;
  }

  if (!ensureUserCanAccessThread(user.id, message.senderId, message.receiverId)) {
    return null;
  }

  return message as unknown as MessageThreadView;
}

export async function createMessageThread(
  unsafeData: z.infer<typeof createMessageThreadSchema>,
): Promise<AppResult<{ id: number }>> {
  const parsed = createMessageThreadSchema.safeParse(unsafeData);
  if (!parsed.success) {
    return createErrorResult("Invalid input data.", ErrorCode.VALIDATION_ERROR);
  }

  const user = await getCurrentUser();
  if (!user) {
    return createErrorResult(
      "You need to be signed in to send a message.",
      ErrorCode.INVALID_CREDENTIALS,
    );
  }

  const data = parsed.data;

  if (data.receiverId === user.id) {
    return createErrorResult(
      "You cannot start a thread with yourself.",
      ErrorCode.VALIDATION_ERROR,
    );
  }

  const receiver = await db.forumUser.findUnique({
    where: { id: data.receiverId },
    select: { id: true },
  });

  if (!receiver) {
    return createErrorResult("Receiver not found.", ErrorCode.NOT_FOUND);
  }

  const created = await db.forumMessage.create({
    data: {
      title: DOMPurify.sanitize(data.title.trim()),
      message: DOMPurify.sanitize(data.message.trim()),
      sender: {
        connect: { id: user.id },
      },
      receiver: {
        connect: { id: receiver.id },
      },
    },
    select: {
      id: true,
    },
  });

  return createSuccessResult({ id: created.id });
}

export async function replyToMessageThread(
  unsafeData: z.infer<typeof replyMessageSchema>,
): Promise<AppResult<{ id: number }>> {
  const parsed = replyMessageSchema.safeParse(unsafeData);
  if (!parsed.success) {
    return createErrorResult("Invalid input data.", ErrorCode.VALIDATION_ERROR);
  }

  const user = await getCurrentUser();
  if (!user) {
    return createErrorResult(
      "You need to be signed in to reply to a message.",
      ErrorCode.INVALID_CREDENTIALS,
    );
  }

  const data = parsed.data;

  const thread = await db.forumMessage.findUnique({
    where: { id: data.messageId },
    select: {
      id: true,
      senderId: true,
      receiverId: true,
    },
  });

  if (!thread) {
    return createErrorResult("Message thread not found.", ErrorCode.NOT_FOUND);
  }

  if (!ensureUserCanAccessThread(user.id, thread.senderId, thread.receiverId)) {
    return createErrorResult(
      "You are not authorized to reply to this thread.",
      ErrorCode.UNAUTHORIZED,
    );
  }

  const receiverId =
    thread.senderId === user.id ? thread.receiverId : thread.senderId;
  if (!receiverId) {
    return createErrorResult(
      "Thread receiver is invalid.",
      ErrorCode.VALIDATION_ERROR,
    );
  }

  const createdReply = await db.forumMessageReply.create({
    data: {
      message: DOMPurify.sanitize(data.message.trim()),
      forumMessage: {
        connect: { id: thread.id },
      },
      sender: {
        connect: { id: user.id },
      },
      receiver: {
        connect: { id: receiverId },
      },
    },
    select: {
      id: true,
    },
  });

  return createSuccessResult({ id: createdReply.id });
}
