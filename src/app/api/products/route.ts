import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { products, productSizes } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";

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

    const id = crypto.randomUUID();
    // Insert the product
    const [product] = await db.transaction(async (tx) => {
      const [newProduct] = await tx
        .insert(products)
        .values({
          id,
          name,
          description,
        })
        .returning();

        
        if (sizes.length > 0) {
          await tx.insert(productSizes).values(
            sizes.map((size: { sizeId: number; stock: number }) => ({
              sizeId: size.sizeId.toString(),
              stock: size.stock,
              productId: id,
              id: crypto.randomUUID()
            }))
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
