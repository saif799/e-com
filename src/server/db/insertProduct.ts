"use server";
import { generateId } from "@/lib/generateId";
import { db } from "@/server/db";
import { images, products, productSizes } from "./schema";
export type Product = {
  name: string;
  modelId: string;
  description: string;
  showcase: string;
  images: Array<{
    imageUrl: string;
    productId: string;
  }>;
  price: number;
  productSizes: Array<{
    productId: string;
    size: number;
    stock: number;
  }>;
};

export async function insertProduct(product: Product) {
    try {
    const productId = generateId();

    await db.insert(products).values({
      id: productId,
      name: product.name,
      modelId: product.modelId,
      description: product.description,
      showCase: product.showcase,
      price: product.price,
    });

    const mappedImages = product.images.map((image) => ({
      id: generateId(),
      imageUrl: image.imageUrl,
      productId: productId,
    }));

    await db.insert(images).values(mappedImages);

    const mappedSizes = product.productSizes.map((size) => ({
      id: generateId(),
      productId: productId,
      size: size.size,
      stock: size.stock,
    }));

    await db.insert(productSizes).values(mappedSizes);

  } catch (error) {
    console.error("Failed to insert product:", error);
    throw error;
  }
}