import { cookies } from "next/headers";
import { getUserFromSession, getUserFromSessionForNav } from "../session";
import { db } from "~/server/db";
import type { ForumUser } from "~/server/types/forum";

export async function getCurrentUser() {
  const user = (await getUserFromSessionForNav(await cookies())) as ForumUser;

  if (user == null) {
    return null;
  }

  const fullUser = await getUserFromDb(user.id);

  // This should never happen
  if (fullUser == null) return null;
  if (!fullUser.group) return null;

  return fullUser;
}

async function getUserFromDb(id: number) {
  return await db.forumUser.findUnique({
    where: {
      id,
    },
    include: {
      group: true,
    },
  });
}
