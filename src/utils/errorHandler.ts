/**
 * Standard error response for applications operations
 */
export interface AppError {
  message: string;
  code: string;
  field?: string;
}

/**
 * Create a standardized app error
 */
export function createAppError(
  message: string,
  code: string,
  field?: string,
): AppError {
  return { message, code, field };
}

/**
 * Standard response type for operations
 */
export interface AppResult<T = void> {
  success: boolean;
  data?: T;
  error?: AppError;
}

/**
 * Create a successful result
 */
export function createSuccessResult<T>(data: T): AppResult<T> {
  return { success: true, data };
}

/**
 * Create a failed result
 */
export function createErrorResult<T = void>(
  message: string,
  code: string,
  field?: string,
): AppResult<T> {
  return {
    success: false,
    error: createAppError(message, code, field),
  };
}

/**
 * Common error codes
 */
export const ErrorCode = {
  // Auth specific
  INVALID_CREDENTIALS: "auth/invalid-credentials",
  USER_NOT_FOUND: "auth/user-not-found",
  EMAIL_IN_USE: "auth/email-in-use",
  USERNAME_IN_USE: "auth/username-in-use",
  UNAUTHORIZED: "auth/unauthorized",
  FORBIDDEN: "auth/forbidden",
  // General
  NOT_FOUND: "app/not-found",
  ALREADY_EXISTS: "app/already-exists",
  VALIDATION_ERROR: "app/validation-error",
  SERVER_ERROR: "app/server-error",
} as const;
