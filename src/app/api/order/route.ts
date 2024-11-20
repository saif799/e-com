// import { orderToGoogleSheet } from "@/actions/orderToGoogleSheet";
// import Order from "@/lib/models/Order";
// import { connectToDB } from "@/lib/mongoDB";
import type { OrderType } from "@/lib/types";
import { db } from "@/server/db";
import { orderTable, productSizesTable } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: OrderType & { size: number; originalQuantity: number } =
      await req.json();

    await db.transaction(async (tx) => {
      await tx.insert(orderTable).values({
        id: crypto.randomUUID(),
        firstName: data.customerInfo.firstName,
        baladia: data.customerInfo.baladia,
        lastName: data.customerInfo.familyName,
        phoneNumber: data.customerInfo.phone,
        quantity: data.quantity,
        price: data.price,
        ProductId: data.productId,
        wilaya: data.customerInfo.wilaya,
      });
      await tx
        .update(productSizesTable)
        .set({ stock: data.originalQuantity - data.quantity })
        .where(
          and(
            eq(productSizesTable.productId, data.productId),
            eq(productSizesTable.size, data.size),
          ),
        );
    });

    // const order = await Order.create(
    //     data
    // );

    // await orderToGoogleSheet(order)

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.log("[ADD ORDERS]", error);
    return new NextResponse("error creating order", { status: 500 });
  }
}
