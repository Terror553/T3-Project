import { db } from "~/server/db";
import type { ForumUser } from "~/server/types/forum";
import type { Group } from "~/server/types/role";

// Helper function to create a partial ForumUser object from database results
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

export async function getUser(id: number): Promise<ForumUser | null> {
  const dbUser = await db.forum_user.findFirst({
    where: {
      id: id,
    },
    include: {
      groups: true,
      forum_topics: true,
      profile_wall_replies: true,
      profile_wall_profile_wall_profileIdIdToforum_user: true,
      profile_wall_profile_wall_userIdToforum_user: true,
    },
  });

  if (dbUser == null) {
    return null;
  }

  if (!dbUser.groups) return null;

  return createForumUserFromDb(dbUser);
}
