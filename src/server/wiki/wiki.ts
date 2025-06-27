import { db } from "../db";

export async function getWikiCategories() {
  const categories = await db.wiki_categories.findMany({
    select: {
      id: true,
      content: true,
      dropdown: true,
      forum_user: {
        select: {
          avatar_url: true,
          username: true,
          groups: {
            select: {
              color: true,
              name: true,
              id: true,
              gradient: true,
              team: true,
              high_team: true,
              start: true,
              end: true,
            },
          },
        },
      },
      createdAt: true,
      icon: true,
      updatedAt: true,
      name: true,
      wiki_sub_categories: {
        select: {
          content: true,
          id: true,
          icon: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          forum_user: {
            select: {
              avatar_url: true,
              username: true,
              groups: {
                select: {
                  color: true,
                  name: true,
                  id: true,
                  gradient: true,
                  team: true,
                  high_team: true,
                  start: true,
                  end: true,
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
