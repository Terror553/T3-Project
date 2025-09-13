"use server";

import { cookies } from "next/headers";
import { type z } from "zod";
import { signUpSchema } from "../authSchemas";
import { createUserSession } from "../session";
import { generateSalt, hashPassword } from "../utils/passwordHasher";
import { db } from "~/server/db";
import { getDefaultRole } from "../utils/defaultRole";
import {
  AuthErrorCode,
  createErrorResult,
  createSuccessResult,
  type AuthResult,
} from "~/utils/authUtils";

export async function signUp(
  unsafeData: z.infer<typeof signUpSchema>,
): Promise<AuthResult<null>> {
  const validationResult = signUpSchema.safeParse(unsafeData);

  if (!validationResult.success) {
    return createErrorResult(
      "Invalid input data",
      AuthErrorCode.VALIDATION_ERROR,
    );
  }

  const data = validationResult.data;

  try {
    const existingUser = await db.forumUser.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
    });

    if (existingUser) {
      return createErrorResult(
        "Account already exists for this email or username",
        AuthErrorCode.EMAIL_IN_USE,
      );
    }

    const salt = generateSalt();
    const hashedPassword = await hashPassword(data.password, salt);
    const defaultRole = await getDefaultRole();

    const user = await db.forumUser.create({
      data: {
        email: data.email,
        password: hashedPassword,
        username: data.username,
        salt,
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: defaultRole.id,
        avatarUrl: "/default.png",
        bannerUrl: "/default.png",
        signature: "",
        userAuthToken: null,
        userId: null,
      },
    });

    if (!user) {
      return createErrorResult(
        "Unable to create account",
        AuthErrorCode.SERVER_ERROR,
      );
    }

    // Create session with the user data
    const sessionUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      avatar_url: user.avatarUrl,
      banner_url: user.bannerUrl,
      signature: user.signature,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      salt: user.salt,
      userAuthToken: user.userAuthToken,
      roleId: user.roleId,
      user_id: user.userId,
    };

    await createUserSession(sessionUser, await cookies());
    return createSuccessResult({ username: sessionUser.username });
  } catch (error) {
    console.error("Error during sign up:", error);
    return createErrorResult(
      "An unexpected error occurred",
      AuthErrorCode.SERVER_ERROR,
    );
  }
}
