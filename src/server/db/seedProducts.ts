// /* eslint-disable @typescript-eslint/no-unsafe-argument */

// // it doenst exists u gotta create it i removed it intentially
// import data from "products.json";
// import { insertProduct } from "./insertProduct";

// export async function seedDatabase() {
//   try {
//     for (const model in data) {
//       if (Array.isArray(data[model])) {
//         for (const product of data[model]) {
//           await insertProduct(product); // Insert each product
//           console.log(`Inserted product: ${product.name}`);
//         }
//       }
//     }
//     console.log("All products inserted successfully!");
//   } catch (error) {
//     console.error("Failed to seed database:", error);
//   }
// }

// seedDatabase().catch((error) => {
//   console.error("Seeding error:", error);
// });

// //npx tsx src/server/db/seedProducts.ts
