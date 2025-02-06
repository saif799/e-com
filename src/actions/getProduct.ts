import { db } from "@/server/db";
import { shoeModels, images, productSizes, products } from "@/server/db/schema";
import { and, desc, eq, inArray, ne } from "drizzle-orm";

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
export async function GetSimilarProductsSizes(
  sizes: Array<string>,
  notEqualProductId: string,
) {
  try {
    const subQuery = db
      .select({ id: productSizes.productId })
      .from(productSizes)
      .where(
        and(
          inArray(productSizes.size, sizes),
          ne(productSizes.productId, notEqualProductId),
        ),
      );
    const productsWithSimilarSizes = await db
      .select()
      .from(products)
      .where(inArray(products.id, subQuery));
    return productsWithSimilarSizes;
  } catch (err) {
    console.log("error selecting a product ", err);
    return;
  }
}
export async function GetSimilarProducts(
  modelId: string,
  notEqualProductId: string,
) {
  try {
    const yourProducts = await db
      .select()
      .from(products)
      .innerJoin(shoeModels, eq(shoeModels.id, products.modelId))
      .where(
        and(eq(products.modelId, modelId), ne(products.id, notEqualProductId)),
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
      .innerJoin(shoeModels, eq(shoeModels.id, products.modelId))
      .innerJoin(productSizes, eq(productSizes.productId, products.id))
      .orderBy(desc(products.createdAt));
    return yourProducts;
  } catch (err) {
    console.log("error selecting a product ", err);
    throw new Error("failed to fetch the prodcuts");
  }
}
