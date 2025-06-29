import { getCategories } from "~/server/forum/forum";
import { apiHandler } from "~/utils/apiHandler";
import { forumCategorySchema } from "~/server/schema/forum";
import { z } from "zod";

export async function GET() {
  return apiHandler({
    handler: getCategories,
    errorMessage: "Failed to fetch forum categories",
    responseSchema: z.array(forumCategorySchema),
  });
}
