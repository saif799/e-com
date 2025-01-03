"use server";

import { db } from "@/server/db";
import { categories, images, productSizes, products } from "@/server/db/schema";
import { and, eq, ne } from "drizzle-orm";

export async function GetProduct(productId: string) {
  try {
    const yourProducts = await db
      .select()
      .from(products)
      .leftJoin(images, eq(images.productId, products.id))
      .leftJoin(productSizes, eq(productSizes.productId, products.id))
      .where(eq(products.id, productId));
    return yourProducts;
  } catch (err) {
    console.log("error selecting a product ", err);
    return;
  }
}
export async function GetSimilarProducts(
  categoryId: string,
  notEqualProductId: string,
) {
  try {
    const yourProducts = await db
      .select()
      .from(products)
      .where(
        and(
          eq(products.categoryId, categoryId),
          ne(products.id, notEqualProductId),
        ),
      );
    return yourProducts;
  } catch (err) {
    console.log("error selecting a product ", err);
    return;
  }
}

export async function GetShowCaseProducts() {
  try {
    const yourProducts = await db
      .select()
      .from(products)
      .innerJoin(categories, eq(categories.id, products.categoryId))
      .orderBy(products.createdAt);
    return yourProducts;
  } catch (err) {
    console.log("error selecting a product ", err);
    throw new Error("failed to fetch the prodcuts");
  }
}
