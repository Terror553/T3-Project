import type { ForumUser } from "@prisma/client";
import { db } from "~/server/db";

export async function getUser(id: number) {
  const fullUser = await db.forumUser.findFirst({
    where: {
      id: id,
    },
    include: {
      group: true,
      topics: true,
      profileWallReplies: true,
      profileWalls: true,
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
