"use server";

import { db } from "@/server/db";
import { posts } from "@/server/db/schema";
import { revalidatePath } from "next/cache";

export async function addPost(formData: FormData) {
  const name = formData.get("name");
  await db.insert(posts).values({ name: name as string });
  revalidatePath("/");

}
export async function deletePost() {
    await db.delete(posts);
      revalidatePath("/");
}
