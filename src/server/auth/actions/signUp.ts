"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { signUpSchema } from "../authSchemas";
import { createUserSession } from "../session";
import { generateSalt, hashPassword } from "../utils/passwordHasher";
import { db } from "~/server/db";
import { getDefaultRole } from "../utils/defaultRole";

export async function signUp(unsafeData: z.infer<typeof signUpSchema>) {
  const { success, data } = signUpSchema.safeParse(unsafeData);

  console.log("SignUp Data", data);
  console.log("SignUp Success", success);

  if (!success) return "Unable to create account";

  const existingUser = await db.forum_user.findFirst({
    where: {
      email: data.email,
      username: data.username,
    },
  });

  if (existingUser != null) return "Account already exists for this email";

  try {
    const salt = generateSalt();
    const hashedPassword = await hashPassword(data.password, salt);
    const defaultRole = await getDefaultRole();

    const user = await db.forum_user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        username: data.username,
        salt,
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: defaultRole.id,
      },
    });

    if (user == null) return "Unable to create account";
    await createUserSession(user, await cookies());
  } catch {
    return "Unable to create account";
  }

  redirect("/");
}
