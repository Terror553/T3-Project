"use server";

import { cookies } from "next/headers";
import { passwordChangeSchema } from "../authSchemas";
import { createUserSession } from "../session";
import {
  comparePasswords,
  generateSalt,
  hashPassword,
} from "../utils/passwordHasher";
import {
  AuthErrorCode,
  createErrorResult,
  createSuccessResult,
  type AuthResult,
} from "~/utils/authUtils";
import type { z } from "zod";
import { getCurrentUser } from "../utils/currentUser";
import { db } from "~/server/db";

export async function changePassword(
  unsafeData: z.infer<typeof passwordChangeSchema>,
): Promise<AuthResult<null>> {
  // Validate input data
  const validationResult = passwordChangeSchema.safeParse(unsafeData);

  if (!validationResult.success) {
    return createErrorResult(
      "Invalid input data",
      AuthErrorCode.VALIDATION_ERROR,
    );
  }

  const user = await getCurrentUser();

  if (!user) {
    return createErrorResult(
      "You need to be signed in to change your password",
      AuthErrorCode.UNAUTHORIZED,
    );
  }

  const data = validationResult.data;

  try {
    // Verify password
    const isCorrectPassword = await comparePasswords({
      hashedPassword: user.password,
      password: data.currentPassword,
      salt: user.salt,
    });

    if (!isCorrectPassword) {
      return createErrorResult(
        "Your current password is incorrect.",
        AuthErrorCode.INVALID_CREDENTIALS,
      );
    }

    const salt = generateSalt();
    const hashedPassword = await hashPassword(data.password, salt);

    // Create session with the new user data
    const sessionUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      password: hashedPassword,
      avatar_url: user.avatarUrl,
      banner_url: user.bannerUrl,
      signature: user.signature,
      createdAt: user.createdAt,
      updatedAt: new Date(),
      salt: salt,
      userAuthToken: user.userAuthToken,
      roleId: user.roleId,
      user_id: user.userId,
    };

    const updatedUser = await db.forumUser.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        salt: salt,
      },
    });

    if (!updatedUser) {
      return createErrorResult(
        "Failed to update password. Please try again.",
        AuthErrorCode.SERVER_ERROR,
      );
    }

    await createUserSession(sessionUser, await cookies());

    return createSuccessResult({
      username: user.username,
    });
  } catch (error) {
    console.error("Error during sign in:", error);
    return createErrorResult(
      "An unexpected error occurred",
      AuthErrorCode.SERVER_ERROR,
    );
  }
}
