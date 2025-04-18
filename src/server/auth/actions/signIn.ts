"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { signInSchema } from "../authSchemas";
import { createUserSession } from "../session";
import { comparePasswords } from "../utils/passwordHasher";
import { db } from "~/server/db";

export async function signIn(unsafeData: z.infer<typeof signInSchema>) {
  const { success, data } = signInSchema.safeParse(unsafeData);

  if (!success) return "Unable to log you in";

  const user = await db.forum_user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (user == null) return "Unable to log you in";
  if (user.password == null) return "Unable to log you in";
  if (user.salt == null) return "Unable to log you in";

  const isCorrectPassword = await comparePasswords({
    hashedPassword: user.password,
    password: data.password,
    salt: user.salt,
  });

  if (!isCorrectPassword) return "Unable to log you in";

  await createUserSession(user, await cookies());

  redirect("/");
}
