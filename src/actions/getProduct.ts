"use server";

import { db } from "@/server/db";
import {
  categoriesTable,
  ImagesTable,
  productSizesTable,
  productsTable,
} from "@/server/db/schema";
import { and, eq, ne } from "drizzle-orm";

export async function GetProduct(productId: string) {
  try {
    const products = await db
      .select()
      .from(productsTable)
      .leftJoin(ImagesTable, eq(ImagesTable.productId, productsTable.id))
      .leftJoin(
        productSizesTable,
        eq(productSizesTable.productId, productsTable.id),
      )
      .where(eq(productsTable.id, productId));
    return products;
  } catch (err) {
    console.log("error selecting a product ", err);
    return;
  }
}
export async function GetSimilarProducts(categoryId:string,notEqualProductId:string) {
  try {
    const products = await db
      .select()
      .from(productsTable)
      .where(and(eq(productsTable.categoryId,categoryId),ne(productsTable.id,notEqualProductId)));
    return products;
  } catch (err) {
    console.log("error selecting a product ", err);
    return;
  }
}


export async function GetShowCaseProducts() {
  try {
    const products = await db
      .select()     
      .from(productsTable) .innerJoin(categoriesTable, eq(categoriesTable.id, productsTable.categoryId)).orderBy(productsTable.createdAt)
    return products;
  } catch (err) {
    console.log("error selecting a product ", err);
    throw new Error("failed to fetch the prodcuts")
  }
}


