"use server";

import data from "products.json"; 
import { insertProduct } from "./insertProduct";

export async function seedDatabase() {
  try {
    for (const product of data.lebrons) {
      await insertProduct(product);
      console.log(`Inserted product: ${product.name}`);
    }
    console.log("All products inserted successfully!");
  } catch (error) {
    console.error("Failed to seed database:", error);
  }
}

seedDatabase().catch((error) => {
    console.error("Seeding error:", error);
  });