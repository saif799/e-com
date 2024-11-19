"use server";

import { db } from "@/server/db";
import { ImagesTable, productsTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function GetProduct(productId: string) {
  try {
    const products = await db
      .select()
      .from(productsTable)
      .leftJoin(ImagesTable, eq(ImagesTable.productId, productsTable.id))
      .where(eq(productsTable.id, productId))
      .all();
    return products[0];
  } catch (err) {
    console.log("error selecting a product ", err);
    return;
  }
}
