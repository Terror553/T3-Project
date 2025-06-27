import { getCategories } from "~/server/forum/forum";
import { apiHandler } from "~/utils/apiHandler";

export async function GET() {
  return apiHandler({
    handler: getCategories,
    errorMessage: "Failed to fetch forum categories",
  });
}