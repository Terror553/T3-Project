export const forumUserSelect = {
  select: {
    id: true,
    username: true,
    avatar_url: true,
    signature: true,
    createdAt: true,
    updatedAt: true,
    groups: true,
  },
};

export const forumTopicReplySelect = {
  forum_topic_replies: {
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      content: true,
      authorId: true,
      topicIdId: true,
      forum_user: forumUserSelect,
    },
  },
  include: {
    forum_user: forumUserSelect,
  },
};

export const forumTopicSelect = {
  forum_topic_reactions: {
    select: {
      forum_reaction_emojis: true,
      id: true,
      authorId: true,
      reactionId: true,
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
  forum_topic_replies: forumTopicReplySelect,
  forum_user: forumUserSelect,
  slug: true,
};
