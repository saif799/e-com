"use server";

import type { CartOrderType, CartProductType } from "@/lib/types";
import {
  orderTable,
  productSizesTable,
  productsOrderedTable,
} from "@/server/db/schema";
import { db } from "@/server/db";
import { generateId } from "@/lib/generateId";
import { inArray, type SQL, sql } from "drizzle-orm";

function generateUpdateCases(products: CartProductType[]) {
  const sqlChunks: SQL[] = [];
  const ids: string[] = [];
  sqlChunks.push(sql`(case`);

  for (const product of products) {
    sqlChunks.push(
      sql`when ${productSizesTable.productId} = ${product.productId} AND ${productSizesTable.size} = ${product.size} then ${productSizesTable.stock} -${product.quantity}`,
    );
    ids.push(product.productId);
  }

  sqlChunks.push(sql`else ${productSizesTable.stock}`);
  sqlChunks.push(sql`end)`);

  const finalSql: SQL = sql.join(sqlChunks, sql.raw(" "));
  return { finalSql, ids };
}

export async function addOrderAction(order: CartOrderType): Promise<{
  success: boolean;
}> {
  try {
    await db.transaction(async (tx) => {
      const orderId = order.id;

      // important : make sure to update this query to include livraison place and update the db schema too
      await tx.insert(orderTable).values({
        id: orderId,
        status: "pending",
        fullName: order.customerInfo.fullName,
        baladia: order.customerInfo.baladia,
        phoneNumber: order.customerInfo.phone,
        wilaya: order.customerInfo.wilaya,
        livraison: order.customerInfo.livraison,
      });

      const productsOrdered = order.products.map((product) => ({
        id: generateId(),
        quantity: product.quantity,
        price: product.price,
        orderId,
        productId: product.productId,
      }));

      await tx.insert(productsOrderedTable).values(productsOrdered);

      //will generate a query to update all the ids in the array u provided
      const { finalSql, ids } = generateUpdateCases(order.products);
      await tx
        .update(productSizesTable)
        .set({ stock: finalSql })
        .where(inArray(productSizesTable.productId, ids));
    });

    return { success: true };
  } catch (error) {
    console.log("not working homie in the add order action", error);

    return { success: false };
  }
}
