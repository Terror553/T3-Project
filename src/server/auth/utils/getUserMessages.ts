import { db } from "~/server/db";
import { getCurrentUser } from "./currentUser";
import type { ForumMessage } from "~/server/types/forum";

export async function getUserMessages(): Promise<ForumMessage[] | null> {
  const user = await getCurrentUser();

  if (user == null) {
    return [];
  }

  const recievedMessages = await db.forumMessage.findMany({
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
                  group: {
                    select: {
                      name: true,
                      color: true,
                      end: true,
                      start: true,
                      gradient: true,
                    },
                  },
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
              group: {
                select: {
                  name: true,
                  color: true,
                  end: true,
                  start: true,
                  gradient: true,
                },
              },
            },
          },
        },
      },
      sender: {
        select: {
          id: true,
          username: true,
          avatarUrl: true,
          group: {
            select: {
              name: true,
              color: true,
              end: true,
              start: true,
              gradient: true,
            },
          },
        },
      },
      receiver: {
        select: {
          id: true,
          username: true,
          avatarUrl: true,
          group: {
            select: {
              name: true,
              color: true,
              end: true,
              start: true,
              gradient: true,
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  const sentMessages = await db.forumMessage.findMany({
    where: {
      senderId: user.id,
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
                  group: {
                    select: {
                      name: true,
                      color: true,
                      end: true,
                      start: true,
                      gradient: true,
                    },
                  },
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
              group: {
                select: {
                  name: true,
                  color: true,
                  end: true,
                  start: true,
                  gradient: true,
                },
              },
            },
          },
        },
      },
      sender: {
        select: {
          id: true,
          username: true,
          avatarUrl: true,
          group: {
            select: {
              name: true,
              color: true,
              end: true,
              start: true,
              gradient: true,
            },
          },
        },
      },
      receiver: {
        select: {
          id: true,
          username: true,
          avatarUrl: true,
          group: {
            select: {
              name: true,
              color: true,
              end: true,
              start: true,
              gradient: true,
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return [...recievedMessages, ...sentMessages] as ForumMessage[];
}

export async function getMessage(id: number): Promise<ForumMessage | null> {
  const user = await getCurrentUser();

  if (user == null) {
    return null;
  }

  const message = await db.forumMessage.findFirst({
    where: { id },
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
          sender: {
            select: {
              id: true,
              username: true,
              avatarUrl: true,
              group: {
                select: {
                  name: true,
                  color: true,
                  end: true,
                  start: true,
                  gradient: true,
                },
              },
            },
          },
        },
      },
      sender: {
        select: {
          id: true,
          username: true,
          avatarUrl: true,
          group: {
            select: {
              name: true,
              color: true,
              end: true,
              start: true,
              gradient: true,
            },
          },
        },
      },
      receiver: {
        select: {
          id: true,
          username: true,
          avatarUrl: true,
          group: {
            select: {
              name: true,
              color: true,
              end: true,
              start: true,
              gradient: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return message as ForumMessage;
}
