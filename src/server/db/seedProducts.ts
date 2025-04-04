// /* eslint-disable @typescript-eslint/no-unsafe-argument */

// // it doenst exists u gotta create it i removed it intentially
// // import data from "products.json";
// import { insertProduct } from "./insertProduct";
// const data = {
 
//   "Jordan 39": [
//     {
//       name: "Jordan 39 Lumiere",
//       modelId: "3677e4fc3c3xl",
//       description:
//         "Experience the evolution of basketball footwear with the Air Jordan 39. Designed for the modern game, it features advanced cushioning with ZoomX and Air Zoom, providing exceptional responsiveness for grounded, strategic movements. Step into a new era of performance.",
//       showcase:
//         "https://www.nike.ae/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dw107cb095/nk/bf9/4/7/0/8/5/bf947085_bf91_422c_8301_6457e79dbf65.jpg",
//       images: [
//         {
//           imageUrl:
//             "https://www.nike.ae/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dwb830f6ca/nk/7db/8/1/6/6/0/7db81660_c1b1_4545_af86_0ab19bffd654.jpg",
//           productId: "",
//         },
//         {
//           imageUrl:
//             "https://www.nike.ae/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dw9f311189/nk/cb0/3/e/e/b/4/cb03eeb4_cecb_46d1_883b_50515ec8974e.jpg",
//           productId: "",
//         },
//         {
//           imageUrl:
//             "https://www.nike.ae/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dw86ae57f7/nk/f81/3/5/5/f/c/f81355fc_9dfa_43ab_afda_3e46152e9cc3.jpg",
//           productId: "",
//         },
//         {
//           imageUrl:
//             "https://www.nike.ae/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dw0e300672/nk/516/f/b/4/6/4/516fb464_0260_4e8e_8c5e_ec28d1b4e144.jpg",
//           productId: "",
//         },
//         {
//           imageUrl:
//             "https://www.nike.ae/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dw3c5042f3/nk/959/0/e/d/2/1/9590ed21_6a99_49ec_9b42_88f30103e024.jpg",
//           productId: "",
//         },
//         {
//           imageUrl:
//             "https://www.nike.ae/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dwdf6522f9/nk/5b1/1/b/4/9/8/5b11b498_3882_46ca_a050_2164d994bc95.jpg",
//           productId: "",
//         },
//         {
//           imageUrl:
//             "https://www.nike.ae/dw/image/v2/BDVB_PRD/on/demandware.static/-/Sites-akeneo-master-catalog/default/dwdb447276/nk/b48/d/f/9/b/c/b48df9bc_78b7_47cc_b0ff_3096475e23cc.jpg",
//           productId: "",
//         },
//       ],
//       price: 24500,
//       productSizes: [{ productId: "", size: 43, stock: 0 }],
//     },
//   ],
// };

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
