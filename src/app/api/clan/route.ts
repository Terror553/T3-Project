import { apiHandler } from "~/utils/apiHandler";
import { getClans } from "~/server/clan/clan";

export async function GET() {
  return apiHandler({ handler: getClans, errorMessage: "Failed to fetch clans" });
}
