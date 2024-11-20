import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { productSizesTable, productsTable } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { generateId } from "@/lib/generateId";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name, description, sizes } = (await req.json()) as {
      name: string;
      description: string;
      sizes: { sizeId: number; stock: number }[];
    };

    const id = generateId();
    // Insert the product
    const [product] = await db.transaction(async (tx) => {
      const [newProduct] = await tx
        .insert(productsTable)
        .values({
          id,
          name,
          description,
          price: 222,
        })
        .returning();

      if (sizes.length > 0) {
        await tx.insert(productSizesTable).values(
          sizes.map((size: { sizeId: number; stock: number }) => ({
            sizeId: size.sizeId.toString(),
            stock: size.stock,
            productId: id,
            id: crypto.randomUUID(),
            size: 22,
          })),
        );
      }

      // Insert the product sizes

      return [newProduct];
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
