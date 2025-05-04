import { z } from "zod";
import crypto from "crypto";
import { db } from "../db";

const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7;
const COOKIE_SESSION_KEY = "MELONEN_MC_SESSION";

const sessionSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  salt: z.string(),
  userAuthToken: z.string().nullable(),
  avatar_url: z.string(),
  banner_url: z.string(),
  signature: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  roleId: z.number().nullable(),
  user_id: z.number().nullable(),
});

type UserSession = z.infer<typeof sessionSchema>;

export type Cookies = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean;
      httpOnly?: boolean;
      sameSite?: "strict" | "lax";
      expires?: number;
    },
  ) => void;
  get: (key: string) => { name: string; value: string } | undefined;
  delete: (key: string) => void;
};

export async function getUserFromSession(cookies: Pick<Cookies, "get">) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;

  return getUserSessionById(sessionId);
}

export async function getUserFromSessionForNav(cookies: Pick<Cookies, "get">) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;
  const user = await db.forum_user.findFirst({
    where: {
      userAuthToken: sessionId,
    },
    select: {
      id: true,
      username: true,
      avatar_url: true,
      banner_url: true,
      signature: true,
      createdAt: true,
      updatedAt: true,
      groups: {
        select: {
          id: true,
          name: true,
          color: true,
          default: true,
          team: true,
          high_team: true,
          priority: true,
          gradient: true,
          start: true,
          end: true,
        },
      },
    },
  });

  return user;
}

export async function updateUserSessionData(
  user: UserSession,
  cookies: Pick<Cookies, "get">,
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;

  // EXPERITION DATE
}

export async function createUserSession(
  user: UserSession,
  cookies: Pick<Cookies, "set">,
) {
  const sessionId = crypto.randomBytes(512).toString("hex").normalize();
  await db.forum_user.update({
    where: {
      id: user.id,
    },
    data: {
      userAuthToken: sessionId,
    },
  });

  await setCookie(sessionId, cookies);
}

export async function updateUserSessionExpiration(
  cookies: Pick<Cookies, "get" | "set">,
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;

  const user = await getUserSessionById(sessionId);
  if (user == null) return;
  await setCookie(sessionId, cookies);
}

export async function removeUserFromSession(
  cookies: Pick<Cookies, "get" | "delete">,
) {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (sessionId == null) return null;

  // DELETE SESSION
  cookies.delete(COOKIE_SESSION_KEY);
}

async function setCookie(sessionId: string, cookies: Pick<Cookies, "set">) {
  cookies.set(COOKIE_SESSION_KEY, sessionId, {
    secure: false,
    httpOnly: true,
    sameSite: "strict",
    expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
  });
}

async function getUserSessionById(sessionId: string) {
  const rawUser = await db.forum_user.findFirst({
    where: {
      userAuthToken: sessionId,
    },
  });

  const { success, data: user } = sessionSchema.safeParse(rawUser);

  return success ? user : null;
}
