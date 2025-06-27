"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { signInSchema } from "../authSchemas";
import { createUserSession } from "../session";
import { comparePasswords } from "../utils/passwordHasher";
import { db } from "~/server/db";
import { 
  AuthErrorCode,
  createErrorResult, 
  createSuccessResult, 
  type AuthResult 
} from "~/utils/authUtils";

export async function signIn(
  unsafeData: z.infer<typeof signInSchema>
): Promise<AuthResult<null>> {
  // Validate input data
  const validationResult = signInSchema.safeParse(unsafeData);
  
  if (!validationResult.success) {
    return createErrorResult(
      "Invalid input data",
      AuthErrorCode.VALIDATION_ERROR
    );
  }

  const data = validationResult.data;
  
  try {
    // Find user by email
    const user = await db.forum_user.findFirst({
      where: { email: data.email },
    });

    // Check if user exists and has password/salt
    if (!user || !user.password || !user.salt) {
      return createErrorResult(
        "Invalid email or password",
        AuthErrorCode.INVALID_CREDENTIALS
      );
    }

    // Verify password
    const isCorrectPassword = await comparePasswords({
      hashedPassword: user.password,
      password: data.password,
      salt: user.salt,
    });

    if (!isCorrectPassword) {
      return createErrorResult(
        "Invalid email or password",
        AuthErrorCode.INVALID_CREDENTIALS
      );
    }

    // Create session
    await createUserSession(user, await cookies());
    
    return createSuccessResult(null);
  } catch (error) {
    console.error("Error during sign in:", error);
    return createErrorResult(
      "An unexpected error occurred",
      AuthErrorCode.SERVER_ERROR
    );
  }
}