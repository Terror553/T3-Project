import { db } from "~/server/db";
import type { ForumUser } from "~/server/types/forum";

export async function getUser(id: number) {
  const fullUser = await db.forumUser.findFirst({
    where: {
      id: id,
    },
    include: {
      group: true,
      profileWalls: {
        include: {
          replies: true,
          user: {
            select: {
              id: true,
              username: true,
              avatarUrl: true,
              bannerUrl: true,
              createdAt: true,
              updatedAt: true,
              group: {
                select: {
                  name: true,
                  default: true,
                  id: true,
                  color: true,
                  team: true,
                  highTeam: true,
                  priority: true,
                  gradient: true,
                  start: true,
                  end: true,
                },
              },
              signature: true,
            },
          },
        },
      },
    },
  });

  if (fullUser == null) {
    return null;
  }

  // This should never happen
  if (fullUser == null) return null;
  if (!fullUser.group) return null;

  return fullUser as ForumUser;
}
