import { cookies } from "next/headers";
import { getUserFromSession } from "../session";
import { db } from "~/server/db";
import type { ForumUser } from "~/server/types/forum";
import type { Group } from "~/server/types/role";

// Helper function to create a ForumUser object from database results
const createForumUserFromDb = (dbUser: any): ForumUser | null => {
  if (!dbUser) return null;

  return {
    id: dbUser.id,
    username: dbUser.username,
    email: dbUser.email,
    password: dbUser.password,
    salt: dbUser.salt,
    userAuthToken: dbUser.userAuthToken,
    avatarUrl: dbUser.avatar_url,
    bannerUrl: dbUser.banner_url,
    signature: dbUser.signature,
    createdAt: dbUser.createdAt,
    updatedAt: dbUser.updatedAt,
    roleId: dbUser.roleId,
    userId: dbUser.user_id,
    group: dbUser.groups as Group,
    // These are optional fields so we don't need to include them
  };
};

export async function getCurrentUser(): Promise<ForumUser | null> {
  const user = await getUserFromSession(await cookies());

  if (user == null) {
    return null;
  }

  const dbUser = await getUserFromDb(user.id);

  // This should never happen
  if (dbUser == null) return null;
  if (!dbUser.groups) return null;

  return createForumUserFromDb(dbUser);
}

async function getUserFromDb(id: number) {
  return await db.forum_user.findUnique({
    where: {
      id,
    },
    include: {
      groups: true,
    },
  });
}
