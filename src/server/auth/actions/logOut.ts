"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { removeUserFromSession } from "../session";

export async function logOut() {
  await removeUserFromSession(await cookies());
  redirect("/");
}
