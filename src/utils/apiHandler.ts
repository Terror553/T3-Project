import { NextResponse } from "next/server";

type ApiHandlerOptions<T> = {
  handler: () => Promise<T>;
  errorMessage?: string;
};

/**
 * A wrapper for API route handlers that provides consistent error handling
 */
export async function apiHandler<T>({ 
  handler, 
  errorMessage = "Internal Server Error" 
}: ApiHandlerOptions<T>) {
  try {
    const data = await handler();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(`API Error: ${errorMessage}`, error);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}