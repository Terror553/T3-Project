import { db } from "../db";
import type { WikiCategoryFull } from "../types/wiki";

export async function getWikiCategories(): Promise<WikiCategoryFull[]> {
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

  // Transform to match WikiCategoryFull
  return categories.map((cat) => ({
    id: cat.id,
    content: cat.content ?? "",
    dropdown: cat.dropdown,
    createdAt: cat.createdAt,
    updatedAt: cat.updatedAt,
    icon: cat.icon,
    name: cat.name,
    forum_user: cat.author
      ? {
          avatar_url: cat.author.avatarUrl,
          username: cat.author.username,
          groups: cat.author.group
            ? {
                color: cat.author.group.color,
                name: cat.author.group.name,
                id: cat.author.group.id,
                gradient: cat.author.group.gradient,
                team: cat.author.group.team,
                high_team: cat.author.group.highTeam,
                start: cat.author.group.start ?? "",
                end: cat.author.group.end ?? "",
              }
            : {
                color: "",
                name: "",
                id: 0,
                gradient: 0,
                team: 0,
                high_team: 0,
                start: "",
                end: "",
              },
        }
      : {
          avatar_url: "",
          username: "",
          groups: {
            color: "",
            name: "",
            id: 0,
            gradient: 0,
            team: 0,
            high_team: 0,
            start: "",
            end: "",
          },
        },
    wiki_sub_categories: cat.subcategories.map((sub) => ({
      id: sub.id,
      content: sub.content ?? "",
      icon: sub.icon ?? "",
      name: sub.name,
      createdAt: sub.createdAt,
      updatedAt: sub.updatedAt,
      forum_user: sub.author
        ? {
            avatar_url: sub.author.avatarUrl,
            username: sub.author.username,
            groups: sub.author.group
              ? {
                  color: sub.author.group.color,
                  name: sub.author.group.name,
                  id: sub.author.group.id,
                  gradient: sub.author.group.gradient,
                  team: sub.author.group.team,
                  high_team: sub.author.group.highTeam,
                  start: sub.author.group.start ?? "",
                  end: sub.author.group.end ?? "",
                }
              : {
                  color: "",
                  name: "",
                  id: 0,
                  gradient: 0,
                  team: 0,
                  high_team: 0,
                  start: "",
                  end: "",
                },
          }
        : {
            avatar_url: "",
            username: "",
            groups: {
              color: "",
              name: "",
              id: 0,
              gradient: 0,
              team: 0,
              high_team: 0,
              start: "",
              end: "",
            },
          },
    })),
  }));
}
