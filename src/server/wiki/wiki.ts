import { db } from "../db";

export async function getWikiCategories() {
  const categories = await db.wikiCategory.findMany({
    select: {
      id: true,
      content: true,
      dropdown: true,
      author: {
        select: {
          avatarUrl: true,
          username: true,
          group: {
            select: {
              color: true,
              name: true,
              id: true,
              gradient: true,
              team: true,
              highTeam: true,
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
      subcategories: {
        select: {
          content: true,
          id: true,
          icon: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          author: {
            select: {
              avatarUrl: true,
              username: true,
              group: {
                select: {
                  color: true,
                  name: true,
                  id: true,
                  gradient: true,
                  team: true,
                  highTeam: true,
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
