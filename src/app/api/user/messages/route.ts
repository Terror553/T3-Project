import { getUserMessages } from "~/server/auth/utils/getUserMessages";
import { apiHandler } from "~/utils/apiHandler";

export async function GET() {
  return apiHandler({
    handler: getUserMessages,
    errorMessage: "Failed to fetch user messages",
  });
}
