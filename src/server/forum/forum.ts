import { db } from "../db";
import type {
  ForumCategory,
  ForumSubcategory,
  ForumTopic,
  ForumTopicReply,
  ForumUser,
} from "../types/forum";
import { generateWhereClause } from "../utils/dbUtils";

// Helper function to create a partial ForumUser object from database results
const createPartialForumUser = (
  dbUser: any,
): Partial<ForumUser> | undefined => {
  if (!dbUser) return undefined;

  return {
    id: dbUser.id,
    username: dbUser.username,
    email: "", // Fill with empty values for required fields
    password: "",
    salt: "",
    userAuthToken: null,
    avatarUrl: dbUser.avatar_url,
    bannerUrl: "",
    signature: dbUser.signature,
    createdAt: dbUser.createdAt,
    updatedAt: dbUser.updatedAt,
    roleId: null,
    userId: null,
    group: dbUser.groups,
  };
};

export async function getCategories(): Promise<ForumCategory[]> {
  const forum = await db.forum_category.findMany();
  if (!forum) {
    throw new Error("Forum categories not found");
  }

  return Promise.all(
    forum.map(async (category) => {
      const subcategories = await getSubCategories(category.id);

      // Create a properly mapped ForumCategory object
      const mappedCategory: ForumCategory = {
        id: category.id,
        name: category.name,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
        subcategories: subcategories,
      };

      return mappedCategory;
    }),
  );
}

export async function getCategory(id: number | string): Promise<ForumCategory> {
  const where = generateWhereClause(id);

  const category = await db.forum_category.findFirst({
    where,
  });

  if (!category) {
    throw new Error(`Category with id ${id} not found`);
  }

  // Create a properly mapped ForumCategory object
  const mappedCategory: ForumCategory = {
    id: category.id,
    name: category.name,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
    subcategories: await getSubCategories(category.id),
  };

  return mappedCategory;
}

export async function getSubCategories(
  id: number | string,
): Promise<ForumSubcategory[]> {
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

      // Create a properly mapped ForumSubcategory object
      const mappedSubcategory: ForumSubcategory = {
        id: subcategory.id,
        name: subcategory.name,
        description: subcategory.description,
        status: subcategory.status,
        createdAt: subcategory.createdAt,
        updatedAt: subcategory.updatedAt,
        categoryId: subcategory.categoryId,
        slug: subcategory.slug,
        count: topicsCount,
        repliesCount: repliesCount,
        latestEntry: latestEntry,
        // Map topics array properly
        topics: subcategory.forum_topics.map((topic) => ({
          id: topic.id,
          title: topic.title,
          content: topic.content,
          status: topic.status,
          createdAt: topic.createdAt,
          updatedAt: topic.updatedAt,
          locked: topic.locked,
          pinned: topic.pinned,
          authorId: topic.authorId,
          subcategoryId: topic.subcategoryId,
          slug: topic.slug,
          author: createPartialForumUser(topic.forum_user) as ForumUser,
          replies: topic.forum_topic_replies.map((reply) => ({
            id: reply.id,
            content: reply.content,
            createdAt: reply.createdAt,
            updatedAt: reply.updatedAt,
            authorId: reply.authorId,
            topicId: topic.id,
          })),
          reactions: [],
          follows: [],
          topicReactions: [],
        })),
      };

      return mappedSubcategory;
    }),
  );

  return finalSubcategories;
}

export async function getSubCategory(
  id: number | string,
): Promise<ForumSubcategory> {
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

  // Create a properly mapped ForumSubcategory object
  const mappedSubcategory: ForumSubcategory = {
    id: subcategory.id,
    name: subcategory.name,
    description: subcategory.description,
    status: subcategory.status,
    createdAt: subcategory.createdAt,
    updatedAt: subcategory.updatedAt,
    categoryId: subcategory.categoryId,
    slug: subcategory.slug,
    count: totalTopicsLength,
    repliesCount: repliesCount,
    latestEntry: await getLatestTopic(subcategory.id),
    // Map topics array properly
    topics: subcategory.forum_topics.map((topic) => ({
      id: topic.id,
      title: topic.title,
      content: topic.content,
      status: topic.status,
      createdAt: topic.createdAt,
      updatedAt: topic.updatedAt,
      locked: topic.locked,
      pinned: topic.pinned,
      authorId: topic.authorId,
      subcategoryId: topic.subcategoryId,
      slug: topic.slug,
      author: createPartialForumUser(topic.forum_user) as ForumUser,
      replies: topic.forum_topic_replies.map((reply) => ({
        id: reply.id,
        content: "", // We only have ID in the select
        createdAt: new Date(), // Placeholder
        updatedAt: new Date(), // Placeholder
        authorId: null,
        topicId: topic.id,
      })),
      reactions: [],
      follows: [],
      topicReactions: [],
    })),
  };

  return mappedSubcategory;
}

export async function getTopic(id: number | string): Promise<ForumTopic> {
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

  // Create mapped replies array
  const mappedReplies: ForumTopicReply[] = topic.forum_topic_replies.map(
    (reply) => ({
      id: reply.id,
      content: reply.content,
      createdAt: reply.createdAt,
      updatedAt: reply.updatedAt,
      authorId: reply.authorId,
      topicId: topic.id,
      author: createPartialForumUser(reply.forum_user) as ForumUser,
    }),
  );

  // Get the latest reply
  const latestReply =
    mappedReplies.length > 0 ? mappedReplies[mappedReplies.length - 1] : null;

  // Create a properly mapped ForumTopic object
  const mappedTopic: ForumTopic = {
    id: topic.id,
    title: topic.title,
    content: topic.content,
    status: topic.status,
    createdAt: topic.createdAt,
    updatedAt: topic.updatedAt,
    locked: topic.locked,
    pinned: topic.pinned,
    authorId: topic.authorId,
    subcategoryId: topic.subcategoryId,
    slug: topic.slug,
    count: repliesCount,
    replies: mappedReplies,
    // Empty arrays for these collections or map them properly if needed
    reactions: [],
    follows: [],
    topicReactions: [],
    // Set the author
    author: createPartialForumUser(topic.forum_user) as ForumUser,
    // Set the latest reply if it exists
    latestReply: latestReply || undefined,
  };

  return mappedTopic;
}

export async function getLatestTopic(
  id: number | string,
): Promise<ForumTopic | null> {
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

  const topic = latestTopic[0];

  // Create mapped replies array
  const mappedReplies: ForumTopicReply[] = topic.forum_topic_replies.map(
    (reply) => ({
      id: reply.id,
      content: reply.content,
      createdAt: reply.createdAt,
      updatedAt: reply.updatedAt,
      authorId: reply.authorId,
      topicId: topic.id,
      author: createPartialForumUser(reply.forum_user) as ForumUser,
    }),
  );

  // Get the latest reply
  const latestReply =
    mappedReplies.length > 0 ? mappedReplies[mappedReplies.length - 1] : null;

  // Create a properly mapped ForumTopic object
  const mappedTopic: ForumTopic = {
    id: topic.id,
    title: topic.title,
    content: topic.content,
    status: topic.status,
    createdAt: topic.createdAt,
    updatedAt: topic.updatedAt,
    locked: topic.locked,
    pinned: topic.pinned,
    authorId: topic.authorId,
    subcategoryId: topic.subcategoryId,
    slug: topic.slug,
    count: topic.forum_topic_replies.length,
    replies: mappedReplies,
    // Empty arrays for these collections or map them properly if needed
    reactions: [],
    follows: [],
    topicReactions: [],
    // Set the author
    author: createPartialForumUser(topic.forum_user) as ForumUser,
    // Set the latest reply if it exists
    latestReply: latestReply || undefined,
  };

  return mappedTopic;
}
