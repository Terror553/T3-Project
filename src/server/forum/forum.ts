"use server";
import {
  createTopicSchema,
  deleteTopicSchema,
  editTopicSchema,
} from "~/lib/schemas/topicSchemas";
import { db } from "../db";
import type {
  ForumCategory,
  ForumSubcategory,
  ForumTopic,
  ForumTopicReply,
  ForumUser,
  ForumReaction,
  ForumReactionEmoji,
} from "../types/forum";
import { generateWhereClause } from "../utils/dbUtils";
import type { z } from "zod";
import {
  ErrorCode,
  createErrorResult,
  createSuccessResult,
  type AppResult,
} from "~/utils/errorHandler";
import { getCurrentUser } from "../auth/utils/currentUser";
import { createSlug } from "../utils/forumUtils";
import { sanitizeInput } from "~/lib/sanitize";

export async function getCategories() {
  const forum = await db.forumCategory.findMany();
  if (!forum) {
    throw new Error("Forum categories not found");
  }

  return Promise.all(
    forum.map(async (category) => {
      const subcategories = await getSubCategories(category.id);

      return {
        ...category,
        forum_subcategories: subcategories,
      } as ForumCategory;
    }),
  );
}

export async function getCategory(id: number | string) {
  const where = generateWhereClause(id);

  const category = await db.forumCategory.findFirst({
    where,
  });
  if (!category) {
    throw new Error(`Category with id ${id} not found`);
  }
  return {
    ...category,
    forum_subcategories: await getSubCategories(category.id),
  } as ForumCategory;
}

export async function getSubCategories(id: number | string) {
  const where = generateWhereClause(id);

  const subcategories = await db.forumSubcategory.findMany({
    where: { category: where },
    include: {
      topics: {
        include: {
          replies: {
            include: {
              author: {
                include: {
                  group: true,
                },
              },
            },
          },
          author: {
            include: {
              group: true,
            },
          },
        },
      },
    },
  });

  if (!subcategories) {
    throw new Error(`Subcategory with id ${id} not found`);
  }

  return Promise.all(
    subcategories.map(async (subcategory) => {
      const topics = await Promise.all(
        subcategory.topics.map(async (topic) => {
          const replies = topic.replies.map((reply) => ({
            ...reply,
            topicIdId: topic.id,
            forum_user: reply.author as ForumUser,
          })) as ForumTopicReply[];

          return {
            ...topic,
            forum_topic_replies: replies,
            forum_user: topic.author as ForumUser,
          } as ForumTopic;
        }),
      );

      const topicsCount = topics.length;
      const repliesCount = topics.reduce(
        (acc: number, topic) => acc + topic.forum_topic_replies.length,
        0,
      );
      const latestEntry = await getLatestTopic(subcategory.id);

      return {
        ...subcategory,
        forum_topics: topics,
        count: topicsCount,
        repliesCount,
        latestEntry,
      } as ForumSubcategory;
    }),
  );
}

export async function getSubCategory(id: number | string) {
  const where = generateWhereClause(id);

  const subcategory = await db.forumSubcategory.findFirst({
    where,
    include: {
      topics: {
        include: {
          replies: {
            include: {
              author: {
                include: {
                  group: true,
                },
              },
            },
          },
          author: {
            include: {
              group: true,
            },
          },
        },
      },
    },
  });

  if (!subcategory) {
    throw new Error(`Subcategory with id ${id} not found`);
  }

  const topics = await Promise.all(
    subcategory.topics.map(async (topic) => {
      const replies = topic.replies.map((reply) => ({
        ...reply,
        topicIdId: topic.id,
        forum_user: reply.author as ForumUser,
      })) as ForumTopicReply[];

      return {
        ...topic,
        forum_topic_replies: replies,
        forum_user: topic.author as ForumUser,
      } as ForumTopic;
    }),
  );

  return {
    ...subcategory,
    forum_topics: topics,
    count: topics.length,
    repliesCount: topics.reduce(
      (acc: number, topic) => acc + topic.forum_topic_replies.length,
      0,
    ),
    latestEntry: await getLatestTopic(subcategory.id),
  } as ForumSubcategory;
}

export async function getTopic(id: number | string) {
  const where = generateWhereClause(id);

  const topic = await db.forumTopic.findFirst({
    where,
    include: {
      replies: {
        include: {
          author: {
            include: {
              group: true,
            },
          },
        },
      },
      reactions: {
        include: {
          emoji: true,
          author: true,
        },
      },
      follows: true,
      author: {
        include: {
          group: true,
        },
      },
    },
  });

  if (!topic) {
    throw new Error(`Topic with id ${id} not found`);
  }

  const replies = topic.replies.map((reply) => ({
    ...reply,
    topicIdId: topic.id,
    forum_user: reply.author as ForumUser,
  })) as ForumTopicReply[];

  const reactions = topic.reactions.map((reaction) => ({
    ...reaction,
    forum_reaction_emojis: reaction.emoji as ForumReactionEmoji,
  })) as ForumReaction[];

  return {
    ...topic,
    forum_topic_replies: replies,
    forum_reactions: reactions,
    forum_topic_follow: topic.follows,
    forum_user: topic.author as ForumUser,
    count: replies.length,
    latestReply: replies[replies.length - 1],
  } as ForumTopic;
}

export async function getLatestTopic(id: number | string) {
  const where = generateWhereClause(id);

  const topics = await db.forumTopic.findMany({
    where: {
      subcategory: where,
    },
    include: {
      replies: {
        include: {
          author: {
            include: {
              group: true,
            },
          },
        },
      },
      reactions: {
        include: {
          emoji: true,
          author: true,
        },
      },
      author: {
        include: {
          group: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 1,
  });

  if (!topics.length) {
    return null;
  }

  const firstTopic = topics[0]!; // Assert that we have a topic since we checked length

  const replies = firstTopic.replies.map((reply) => ({
    ...reply,
    topicIdId: firstTopic.id,
    forum_user: reply.author as ForumUser,
  })) as ForumTopicReply[];

  const reactions = firstTopic.reactions.map((reaction) => ({
    ...reaction,
    forum_reaction_emojis: reaction.emoji as ForumReactionEmoji,
  })) as ForumReaction[];

  return {
    ...firstTopic,
    forum_topic_replies: replies,
    forum_reactions: reactions,
    forum_user: firstTopic.author as ForumUser,
    count: replies.length,
    latestReply: replies[replies.length - 1],
  } as ForumTopic;
}

export async function createTopic(
  unsafeData: z.infer<typeof createTopicSchema>,
): Promise<AppResult<{ slug: string | null; subcategory: number }>> {
  // Validate input data
  const validationResult = createTopicSchema.safeParse(unsafeData);

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
        "You need to be signed in to create a topic",
        ErrorCode.INVALID_CREDENTIALS,
      );
    }

    const slug = createSlug(data.title);
    const newTopic = await db.forumTopic.create({
      data: {
        title: data.title,
        content: sanitizeInput(data.content),
        slug,
        author: {
          connect: {
            id: user.id,
          },
        },
        subcategory: {
          connect: {
            id: data.subcategory,
          },
        },
      },
    });

    return createSuccessResult({
      slug: newTopic.slug, // Placeholder slug, replace with actual slug generation logic
      subcategory: data.subcategory,
    });
  } catch (error) {
    console.error("Error during topic creation:", error);
    return createErrorResult(
      "An unexpected error occurred",
      ErrorCode.SERVER_ERROR,
    );
  }
}

export async function editTopic(
  unsafeData: z.infer<typeof editTopicSchema>,
): Promise<AppResult<{ slug: string | null; id: number }>> {
  // Validate input data
  const validationResult = editTopicSchema.safeParse(unsafeData);

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
        "You need to be signed in to create a topic",
        ErrorCode.INVALID_CREDENTIALS,
      );
    }

    let where;

    if (data.id == null) {
      where = {
        slug: data.slug!,
      };
    } else {
      where = {
        id: data.id,
      };
    }

    const topic = await db.forumTopic.findFirst({ where });
    let slug = data.slug;

    if (!topic) {
      return createErrorResult("Topic not found", ErrorCode.NOT_FOUND);
    }

    if (topic.authorId !== user.id) {
      return createErrorResult(
        "You are not authorized to edit this topic",
        ErrorCode.UNAUTHORIZED,
      );
    }

    if (topic.title == data.title && topic.content == data.content) {
      return createErrorResult(
        "No changes detected",
        ErrorCode.VALIDATION_ERROR,
      );
    }

    if (topic.title !== data.title) {
      slug = createSlug(data.title);
      topic.slug = slug;
    }

    topic.content = data.content;

    await db.forumTopic.update({
      where: { id: topic.id },
      data: {
        title: topic.title,
        content: topic.content,
        slug: topic.slug,
      },
    });

    return createSuccessResult({
      slug: slug || topic.slug, // Use the updated slug if it exists, otherwise use the existing one
      id: topic.id,
    });
  } catch (error) {
    console.error("Error during editing topic:", error);
    return createErrorResult(
      "An unexpected error occurred",
      ErrorCode.SERVER_ERROR,
    );
  }
}

export async function deleteTopic(
  unsafeData: z.infer<typeof deleteTopicSchema>,
): Promise<AppResult<{ success: boolean }>> {
  // Validate input data
  const validationResult = deleteTopicSchema.safeParse(unsafeData);

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
        "You need to be signed in to delete a topic",
        ErrorCode.INVALID_CREDENTIALS,
      );
    }

    let where;

    if (data.id == null) {
      where = {
        slug: data.slug!,
      };
    } else {
      where = {
        id: data.id,
      };
    }

    const topic = await db.forumTopic.findFirst({ where });

    if (!topic) {
      return createErrorResult("Topic not found", ErrorCode.NOT_FOUND);
    }

    if (topic.authorId !== user.id && user.group?.highTeam !== 1) {
      return createErrorResult(
        "You are not authorized to delete this topic",
        ErrorCode.UNAUTHORIZED,
      );
    }

    await db.forumTopic.update({
      where: { id: topic.id },
      data: {
        title: topic.title,
        content: topic.content,
        slug: topic.slug,
      },
    });

    return createSuccessResult({
      success: true,
    });
  } catch (error) {
    console.error("Error during deleting topic:", error);
    return createErrorResult(
      "An unexpected error occurred",
      ErrorCode.SERVER_ERROR,
    );
  }
}
