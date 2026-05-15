import { db } from "~/server/db";
import { getCurrentUser } from "./currentUser";
import type { ForumMessage } from "~/server/types/forum";

export async function getUserMessages(): Promise<ForumMessage[] | null> {
  const user = await getCurrentUser();

  if (user == null) {
    return null;
  }

  const messages = await db.forumMessage.findMany({
    where: {
      receiverId: user.id,
    },
    select: {
      seen: true,
      id: true,
      createdAt: true,
      message: true,
      title: true,
      messageReplies: {
        select: {
          id: true,
          createdAt: true,
          message: true,
          seen: true,
          forumMessage: {
            select: {
              id: true,
              createdAt: true,
              message: true,
              title: true,
              seen: true,
              receiver: {
                select: {
                  avatarUrl: true,
                  createdAt: true,
                  group: true,
                  id: true,
                  signature: true,
                  bannerUrl: true,
                },
              },
            },
          },
          sender: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
      receiver: {
        select: {
          id: true,
          username: true,
          avatarUrl: true,
          group: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return messages as ForumMessage[];
}
