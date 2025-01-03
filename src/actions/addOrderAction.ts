"use server";

import type { CartOrderType, CartProductType } from "@/lib/types";
import { orders, productSizes, productsOrdered } from "@/server/db/schema";
import { db } from "@/server/db";
import { generateId } from "@/lib/generateId";
import { inArray, type SQL, sql } from "drizzle-orm";

function generateUpdateCases(products: CartProductType[]) {
  const sqlChunks: SQL[] = [];
  const ids: string[] = [];
  sqlChunks.push(sql`(case`);

  for (const product of products) {
    sqlChunks.push(
      sql`when ${productSizes.productId} = ${product.productId} AND ${productSizes.size} = ${product.size} then ${productSizes.stock} -${product.quantity}`,
    );
    ids.push(product.productId);
  }

  sqlChunks.push(sql`else ${productSizes.stock}`);
  sqlChunks.push(sql`end)`);

  const finalSql: SQL = sql.join(sqlChunks, sql.raw(" "));
  return { finalSql, ids };
}

export async function addOrderAction(order: CartOrderType): Promise<{
  success: boolean;
}> {
  try {
    const orderId = order.id;

    // important : make sure to update this query to include livraison place and update the db schema too
    await db.insert(orders).values({
      id: orderId,
      status: "pending",
      fullName: order.customerInfo.fullName,
      baladia: order.customerInfo.baladia,
      phoneNumber: order.customerInfo.phone,
      wilaya: order.customerInfo.wilaya,
      livraison: order.customerInfo.livraison,
    });

    const pOrdered = order.products.map((product) => ({
      id: generateId(),
      quantity: product.quantity,
      price: product.price,
      orderId,
      productId: product.productId,
    }));

    await db.insert(productsOrdered).values(pOrdered);

    //will generate a query to update all the ids in the array u provided
    const { finalSql, ids } = generateUpdateCases(order.products);
    await db
      .update(productSizes)
      .set({ stock: finalSql })
      .where(inArray(productSizes.productId, ids));

    return { success: true };
  } catch (error) {
    console.log("not working homie in the add order action", error);

    return { success: false };
  }
}
