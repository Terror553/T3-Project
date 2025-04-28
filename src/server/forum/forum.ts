import { db } from "../db";
import type {
  ForumCategory,
  ForumSubcategory,
  ForumTopic,
} from "../types/forum";
import { generateWhereClause } from "../utils/dbUtils";

export async function getCategories() {
  const forum = await db.forum_category.findMany();
  if (!forum) {
    throw new Error("Forum categories not found");
  }

  return Promise.all(
    forum.map(async (category) => {
      const subcategories = await getSubCategories(category.id);

      // Ensure `forum_subcategories` is always an array
      return {
        ...category,
        forum_subcategories: Array.isArray(subcategories)
          ? subcategories
          : Object.values(subcategories), // Convert object to array
      } as ForumCategory;
    }),
  );
}

export async function getCategory(id: number | string) {
  const where = generateWhereClause(id);

  const category = await db.forum_category.findFirst({
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

  const subcategories = await db.forum_subcategory.findMany({
    where: { forum_category: where },
    include: {
      forum_topics: {
        include: {
          forum_topic_replies: true,
          forum_user: {
            omit: {
              password: true,
              email: true,
              banner_url: true,
              salt: true,
              userAuthToken: true,
              user_id: true,
              roleId: true,
            },
            include: {
              groups: true,
            },
          },
        },
      },
    },
  });
  if (!subcategories) {
    throw new Error(`Subcategory with id ${id} not found`);
  }

  // Map subcategories to include only the necessary fields
  const finalSubcategories = await Promise.all(
    subcategories.map(async (subcategory) => {
      // Calculate counts specific to THIS subcategory in the loop
      const topicsCount = subcategory.forum_topics.length;
      const repliesCount = subcategory.forum_topics.reduce(
        (acc, topic) => acc + topic.forum_topic_replies.length,
        0,
      );
      const latestEntry = await getLatestTopic(subcategory.id);

      return {
        ...subcategory,
        count: topicsCount, // Correctly count topics for *this* subcategory
        repliesCount: repliesCount, // Add replies count for *this* subcategory
        latestEntry: latestEntry,
      };
    }),
  );

  return finalSubcategories as ForumSubcategory[];
}

export async function getSubCategory(id: number | string) {
  const where = generateWhereClause(id);

  const subcategory = await db.forum_subcategory.findFirst({
    where,
    include: {
      forum_topics: {
        include: {
          forum_topic_replies: { select: { id: true } },
          forum_user: {
            omit: {
              password: true,
              email: true,
              banner_url: true,
              salt: true,
              userAuthToken: true,
              user_id: true,
              roleId: true,
            },
            include: {
              groups: true,
            },
          },
        },
      },
    },
  });

  if (!subcategory) {
    throw new Error(`Subcategory with id ${id} not found`);
  }

  const totalTopicsLength = subcategory.forum_topics.length;

  const repliesCount = subcategory.forum_topics.reduce(
    (acc, topic) => acc + topic.forum_topic_replies.length,
    0,
  );

  return {
    ...subcategory,
    count: totalTopicsLength,
    repliesCount,
    latestEntry: await getLatestTopic(subcategory.id),
  } as ForumSubcategory;
}

export async function getTopic(id: number | string) {
  const where = generateWhereClause(id);

  const topic = await db.forum_topics.findFirst({
    where,
    include: {
      forum_topic_replies: {
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          content: true,
          authorId: true,
          topicIdId: true,
          forum_user: {
            select: {
              id: true,
              username: true,
              avatar_url: true,
              signature: true,
              createdAt: true,
              updatedAt: true,
              groups: true,
            },
          },
        },
      },
      forum_reactions: {
        select: {
          id: true,
          authorId: true,
          topicId: true,
          forum_reaction_emojis: {
            select: { id: true, name: true, emoji: true, negative: true },
          },
        },
      },
      forum_topic_follow: { select: { id: true, topicId: true, userId: true } },
      forum_user: {
        omit: {
          password: true,
          email: true,
          banner_url: true,
          salt: true,
          userAuthToken: true,
          user_id: true,
          roleId: true,
        },
        include: {
          groups: true,
        },
      },
    },
  });
  if (!topic) {
    throw new Error(`Topic with id ${id} not found`);
  }

  const repliesCount = topic.forum_topic_replies.reduce((acc) => acc + 1, 0);

  return {
    ...topic,
    count: repliesCount,
    latestReply:
      topic.forum_topic_replies[topic.forum_topic_replies.length - 1],
  } as ForumTopic;
}

export async function getLatestTopic(id: number | string) {
  const where = generateWhereClause(id);

  const latestTopic = await db.forum_topics.findMany({
    where: {
      forum_subcategory: where,
    },
    select: {
      forum_topic_follow: { select: { id: true, topicId: true, userId: true } },
      forum_reactions: {
        select: {
          id: true,
          authorId: true,
          topicId: true,
          forum_reaction_emojis: {
            select: { id: true, name: true, emoji: true, negative: true },
          },
        },
      },
      forum_topic_replies: {
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          content: true,
          authorId: true,
          topicIdId: true,
          forum_user: {
            select: {
              id: true,
              username: true,
              avatar_url: true,
              signature: true,
              createdAt: true,
              updatedAt: true,
              groups: true,
            },
          },
        },
      },
      forum_user: {
        select: {
          id: true,
          username: true,
          avatar_url: true,
          signature: true,
          createdAt: true,
          updatedAt: true,
          groups: true,
        },
      },
      id: true,
      title: true,
      content: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      locked: true,
      pinned: true,
      authorId: true,
      subcategoryId: true,
      slug: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 1,
  });

  if (!latestTopic[0]) {
    return null;
  }

  return {
    ...latestTopic[0],
    count: latestTopic[0].forum_topic_replies.length,
    latestReply:
      latestTopic[0].forum_topic_replies[
        latestTopic[0].forum_topic_replies.length - 1
      ],
  } as ForumTopic;
}
