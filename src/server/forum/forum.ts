import { db } from "../db";

export async function getForum() {
  const categories = await db.forum_category.findMany({
    include: {
      forum_subcategory: {
        include: {
          forum_topics: {
            include: {
              forum_topic_replies: true,
              forum_user: {
                omit: {
                  password: true,
                  email: true,
                  createdAt: true,
                  updatedAt: true,
                  banner_url: true,
                  salt: true,
                  userAuthToken: true,
                  user_id: true,
                  roleId: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return categories;
}
