/**
 * Standard error response for auth-related operations
 */
export interface AuthError {
  message: string;
  code: string;
  field?: string;
}

/**
 * Create a standardized auth error
 */
export function createAuthError(
  message: string, 
  code: string, 
  field?: string
): AuthError {
  return { message, code, field };
}

/**
 * Standard response type for auth operations
 */
export interface AuthResult<T> {
  success: boolean;
  data?: T;
  error?: AuthError;
}

/**
 * Create a successful auth result
 */
export function createSuccessResult<T>(data: T): AuthResult<T> {
  return { success: true, data };
}

/**
 * Create a failed auth result
 */
export function createErrorResult<T>(
  message: string, 
  code: string, 
  field?: string
): AuthResult<T> {
  return { 
    success: false, 
    error: createAuthError(message, code, field) 
  };
}

/**
 * Common auth error codes
 */
export const AuthErrorCode = {
  INVALID_CREDENTIALS: "auth/invalid-credentials",
  USER_NOT_FOUND: "auth/user-not-found",
  EMAIL_IN_USE: "auth/email-in-use",
  USERNAME_IN_USE: "auth/username-in-use",
  VALIDATION_ERROR: "auth/validation-error",
  SERVER_ERROR: "auth/server-error",
  UNAUTHORIZED: "auth/unauthorized",
  FORBIDDEN: "auth/forbidden",
} as const;