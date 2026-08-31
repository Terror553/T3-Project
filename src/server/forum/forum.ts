"use server";
import {
  createReplySchema,
  createTopicSchema,
  deleteReplySchema,
  deleteTopicSchema,
  editReplySchema,
  editTopicSchema,
  reactSchema,
  followSchema,
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

function mapRepliesForTopic(topic: any) {
  const replies = (topic.replies || []).map((reply: any) => ({
    ...reply,
    topicIdId: topic.id,
    forum_user: reply.author as ForumUser,
  })) as ForumTopicReply[];
  return replies;
}

function mapReactionsForTopic(topic: any) {
  const reactions = (topic.reactions || []).map((reaction: any) => {
    const rr = reaction as unknown as { emoji: unknown };
    return {
      ...rr,
      forum_reaction_emojis: rr.emoji as ForumReactionEmoji,
    } as unknown as ForumReaction;
  }) as ForumReaction[];
  return reactions;
}

function enrichTopic(topic: any): ForumTopic {
  const replies = mapRepliesForTopic(topic);
  const reactions = mapReactionsForTopic(topic);
  return {
    ...topic,
    forum_topic_replies: replies,
    forum_reactions: reactions,
    forum_user: topic.author as ForumUser,
    count: replies.length,
    latestReply: replies[replies.length - 1],
  } as ForumTopic;
}

export async function getCategories() {
  const forum = await db.forumCategory.findMany();
  if (!forum) {
    throw new Error("Forum categories not found");
  }

  return Promise.all(
    forum.map(async (category: unknown) => {
      const cat = category as ForumCategory;
      const subcategories = await getSubCategories(cat.id);

      return {
        ...cat,
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
    subcategories.map(async (subcategory: unknown) => {
      const sc = subcategory as unknown as ForumSubcategory & {
        topics: Array<
          ForumTopic & {
            replies: Array<ForumTopicReply & { author: ForumUser }>;
            author: ForumUser;
          }
        >;
      };
      const topics = await Promise.all(
        sc.topics.map(async (topic: any) => enrichTopic(topic)),
      );

      const topicsCount = topics.length;
      const repliesCount = topics.reduce(
        (acc: number, topic: ForumTopic & { forum_topic_replies: ForumTopicReply[] }) =>
          acc + topic.forum_topic_replies.length,
        0,
      );
      const latestEntry = await getLatestTopic(sc.id);

      return {
        ...sc,
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

  const subcategoryWithTopics = subcategory as unknown as ForumSubcategory & {
    topics: Array<
      ForumTopic & {
        replies: Array<ForumTopicReply & { author: ForumUser }>;
        author: ForumUser;
      }
    >;
  };

  const topics = await Promise.all(
    subcategoryWithTopics.topics.map(async (topic: any) => enrichTopic(topic)),
  );

  return {
    ...subcategory,
    forum_topics: topics,
    count: topics.length,
    repliesCount: topics.reduce(
      (acc: number, topic: ForumTopic & { forum_topic_replies: ForumTopicReply[] }) =>
        acc + topic.forum_topic_replies.length,
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

  // Use the shared enrichment helper to normalize topic shape
  const enriched = enrichTopic(topic);
  return {
    ...enriched,
    forum_topic_follow: topic.follows,
    forum_user: topic.author as ForumUser,
    count: enriched.count,
    latestReply: enriched.latestReply,
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

  // Enrich the topic using the shared helper to keep mapping consistent
  const enriched = enrichTopic(firstTopic);
  return {
    ...firstTopic,
    ...enriched,
    forum_user: firstTopic.author as ForumUser,
  } as ForumTopic;
}

import DOMPurify from "isomorphic-dompurify";

export async function createTopic(
  unsafeData: z.infer<typeof createTopicSchema>,
): Promise<AppResult<{ slug: string | null; id: number }>> {
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
    const subcategory = await getSubCategory(data.subcategory);
    const existingTopic = await db.forumTopic.findFirst({
      where: {
        slug,
        title: data.title,
        subcategory: {
          id: subcategory.id,
        },
      },
    });
    if (existingTopic) {
      return createErrorResult(
        "A topic with the same title already exists in this subcategory",
        ErrorCode.VALIDATION_ERROR,
      );
    }

    data.content = DOMPurify.sanitize(data.content);

    const newTopic = await db.forumTopic.create({
      data: {
        title: data.title,
        content: data.content,
        slug,
        author: {
          connect: {
            id: user.id,
          },
        },
        subcategory: {
          connect: {
            id: subcategory.id,
          },
        },
      },
    });

    return createSuccessResult({
      slug, // Placeholder slug, replace with actual slug generation logic
      id: newTopic.id,
    });
  } catch (error) {
    console.error("Error during topic creation:", error);
    return createErrorResult(
      data.subcategory + "An unexpected error occurred, " + error,
      ErrorCode.SERVER_ERROR,
    );
  }
}

export async function editTopic(
  unsafeData: z.infer<typeof editTopicSchema>,
): Promise<AppResult<{ slug: string | null; id: number }>> {
  const validationResult = editTopicSchema.safeParse(unsafeData);

  if (!validationResult.success) {
    return createErrorResult("Invalid input data.", ErrorCode.VALIDATION_ERROR);
  }

  const data = validationResult.data;

  try {
    const user = await getCurrentUser();

    if (!user) {
      return createErrorResult(
        "You need to be signed in to edit a topic",
        ErrorCode.INVALID_CREDENTIALS,
      );
    }

    const where = data.id == null ? { slug: data.slug ?? undefined } : { id: data.id };
    const topic = await db.forumTopic.findFirst({ where });

    if (!topic) {
      return createErrorResult("Topic not found", ErrorCode.NOT_FOUND);
    }

    if (topic.authorId !== user.id && user.group?.highTeam !== 1) {
      return createErrorResult(
        "You are not authorized to edit this topic",
        ErrorCode.UNAUTHORIZED,
      );
    }

    if (topic.title === data.title && topic.content === data.content) {
      return createErrorResult(
        "No changes detected",
        ErrorCode.VALIDATION_ERROR,
      );
    }

    const nextTitle = data.title.trim();
    const nextContent = DOMPurify.sanitize(data.content.trim());
    const nextSlug = topic.title !== nextTitle ? createSlug(nextTitle) : topic.slug;

    await db.forumTopic.update({
      where: { id: topic.id },
      data: {
        title: nextTitle,
        content: nextContent,
        slug: nextSlug,
      },
    });

    return createSuccessResult({
      slug: nextSlug ?? topic.slug,
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
  const validationResult = deleteTopicSchema.safeParse(unsafeData);

  if (!validationResult.success) {
    return createErrorResult("Invalid input data.", ErrorCode.VALIDATION_ERROR);
  }

  const data = validationResult.data;

  try {
    const user = await getCurrentUser();

    if (!user) {
      return createErrorResult(
        "You need to be signed in to delete a topic",
        ErrorCode.INVALID_CREDENTIALS,
      );
    }

    const where = data.id == null ? { slug: data.slug ?? undefined } : { id: data.id };
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
        hidden: 1,
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

export async function createReply(
  unsafeData: z.infer<typeof createReplySchema>,
): Promise<AppResult<{ id: number; topicId: number }>> {
  const validationResult = createReplySchema.safeParse(unsafeData);

  if (!validationResult.success) {
    return createErrorResult("Invalid input data.", ErrorCode.VALIDATION_ERROR);
  }

  const data = validationResult.data;

  try {
    const user = await getCurrentUser();

    if (!user) {
      return createErrorResult(
        "You need to be signed in to reply to a topic",
        ErrorCode.INVALID_CREDENTIALS,
      );
    }

    const topicId = data.topicId ?? null;
    if (topicId == null) {
      return createErrorResult("Topic id is required", ErrorCode.VALIDATION_ERROR);
    }

    const topic = await db.forumTopic.findUnique({ where: { id: topicId } });
    if (!topic) {
      return createErrorResult("Topic not found", ErrorCode.NOT_FOUND);
    }

    const nextContent = DOMPurify.sanitize(data.content.trim());
    if (!nextContent.length) {
      return createErrorResult("Reply content cannot be empty", ErrorCode.VALIDATION_ERROR);
    }

    const reply = await db.forumTopicReply.create({
      data: {
        content: nextContent,
        topic: {
          connect: { id: topic.id },
        },
        author: {
          connect: { id: user.id },
        },
      },
    });

    return createSuccessResult({
      id: reply.id,
      topicId: topic.id,
    });
  } catch (error) {
    console.error("Error during creating reply:", error);
    return createErrorResult(
      "An unexpected error occurred",
      ErrorCode.SERVER_ERROR,
    );
  }
}

export async function editReply(
  unsafeData: z.infer<typeof editReplySchema>,
): Promise<AppResult<{ id: number; topicId: number }>> {
  const validationResult = editReplySchema.safeParse(unsafeData);

  if (!validationResult.success) {
    return createErrorResult("Invalid input data.", ErrorCode.VALIDATION_ERROR);
  }

  const data = validationResult.data;

  try {
    const user = await getCurrentUser();

    if (!user) {
      return createErrorResult(
        "You need to be signed in to edit a reply",
        ErrorCode.INVALID_CREDENTIALS,
      );
    }

    if (data.id == null) {
      return createErrorResult("Reply id is required", ErrorCode.VALIDATION_ERROR);
    }

    const reply = await db.forumTopicReply.findUnique({ where: { id: data.id } });
    if (!reply) {
      return createErrorResult("Reply not found", ErrorCode.NOT_FOUND);
    }

    if (reply.authorId !== user.id && user.group?.highTeam !== 1) {
      return createErrorResult(
        "You are not authorized to edit this reply",
        ErrorCode.UNAUTHORIZED,
      );
    }

    const nextContent = DOMPurify.sanitize(data.content.trim());
    if (!nextContent.length) {
      return createErrorResult("Reply content cannot be empty", ErrorCode.VALIDATION_ERROR);
    }

    const updated = await db.forumTopicReply.update({
      where: { id: reply.id },
      data: {
        content: nextContent,
      },
    });

    return createSuccessResult({
      id: updated.id,
      topicId: reply.topicId ?? data.topicId ?? 0,
    });
  } catch (error) {
    console.error("Error during editing reply:", error);
    return createErrorResult(
      "An unexpected error occurred",
      ErrorCode.SERVER_ERROR,
    );
  }
}

export async function deleteReply(
  unsafeData: z.infer<typeof deleteReplySchema>,
): Promise<AppResult<{ success: boolean }>> {
  const validationResult = deleteReplySchema.safeParse(unsafeData);

  if (!validationResult.success) {
    return createErrorResult("Invalid input data.", ErrorCode.VALIDATION_ERROR);
  }

  const data = validationResult.data;

  try {
    const user = await getCurrentUser();

    if (!user) {
      return createErrorResult(
        "You need to be signed in to delete a reply",
        ErrorCode.INVALID_CREDENTIALS,
      );
    }

    if (data.id == null) {
      return createErrorResult("Reply id is required", ErrorCode.VALIDATION_ERROR);
    }

    const reply = await db.forumTopicReply.findUnique({ where: { id: data.id } });
    if (!reply) {
      return createErrorResult("Reply not found", ErrorCode.NOT_FOUND);
    }

    if (reply.authorId !== user.id && user.group?.highTeam !== 1) {
      return createErrorResult(
        "You are not authorized to delete this reply",
        ErrorCode.UNAUTHORIZED,
      );
    }

    await db.forumTopicReply.delete({ where: { id: reply.id } });

    return createSuccessResult({ success: true });
  } catch (error) {
    console.error("Error during deleting reply:", error);
    return createErrorResult(
      "An unexpected error occurred",
      ErrorCode.SERVER_ERROR,
    );
  }
}

export async function toggleTopicReaction(
  unsafeData: z.infer<typeof reactSchema>,
): Promise<AppResult<{ added: boolean }>> {
  const validationResult = reactSchema.safeParse(unsafeData);
  if (!validationResult.success) {
    return createErrorResult("Invalid input data.", ErrorCode.VALIDATION_ERROR);
  }
  const data = validationResult.data;

  try {
    const user = await getCurrentUser();
    if (!user) {
      return createErrorResult(
        "You need to be signed in to react",
        ErrorCode.INVALID_CREDENTIALS,
      );
    }

    const topicId = data.topicId ?? null;
    if (topicId == null) {
      return createErrorResult("Topic id is required", ErrorCode.VALIDATION_ERROR);
    }

    const topic = await db.forumTopic.findUnique({ where: { id: topicId } });
    if (!topic) {
      return createErrorResult("Topic not found", ErrorCode.NOT_FOUND);
    }

    // Check existing reaction by this user for this topic and emoji
    const existing = await db.forumReaction.findFirst({
      where: {
        authorId: user.id,
        topicId: topic.id,
        reactionId: data.reactionId,
      },
    });

    if (existing) {
      await db.forumReaction.delete({ where: { id: existing.id } });
      return createSuccessResult({ added: false });
    }

    await db.forumReaction.create({
      data: {
        author: { connect: { id: user.id } },
        topic: { connect: { id: topic.id } },
        emoji: { connect: { id: data.reactionId } },
      },
    });

    return createSuccessResult({ added: true });
  } catch (error) {
    console.error("Error toggling reaction:", error);
    return createErrorResult("An unexpected error occurred", ErrorCode.SERVER_ERROR);
  }
}

export async function toggleTopicFollow(
  unsafeData: z.infer<typeof followSchema>,
): Promise<AppResult<{ followed: boolean }>> {
  const validationResult = followSchema.safeParse(unsafeData);
  if (!validationResult.success) {
    return createErrorResult("Invalid input data.", ErrorCode.VALIDATION_ERROR);
  }

  const data = validationResult.data;

  try {
    const user = await getCurrentUser();
    if (!user) {
      return createErrorResult(
        "You need to be signed in to follow topics",
        ErrorCode.INVALID_CREDENTIALS,
      );
    }

    const topicId = data.topicId ?? null;
    if (topicId == null) {
      return createErrorResult("Topic id is required", ErrorCode.VALIDATION_ERROR);
    }

    const topic = await db.forumTopic.findUnique({ where: { id: topicId } });
    if (!topic) {
      return createErrorResult("Topic not found", ErrorCode.NOT_FOUND);
    }

    const existing = await db.forumTopicFollow.findFirst({
      where: { userId: user.id, topicId: topic.id },
    });

    if (existing) {
      await db.forumTopicFollow.delete({ where: { id: existing.id } });
      return createSuccessResult({ followed: false });
    }

    await db.forumTopicFollow.create({
      data: {
        user: { connect: { id: user.id } },
        topic: { connect: { id: topic.id } },
      },
    });

    return createSuccessResult({ followed: true });
  } catch (error) {
    console.error("Error toggling follow:", error);
    return createErrorResult("An unexpected error occurred", ErrorCode.SERVER_ERROR);
  }
}
