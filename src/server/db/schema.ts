// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  check,
  index,
  int,
  sqliteTableCreator,
  text,
} from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `${name}`);

export const categoriesTable = createTable("categories", {
  id: text("id").primaryKey(),
  name: text("name", { length: 256 }).notNull(),
  description: text("description", { length: 512 }),
});

export const productsTable = createTable(
  "products",
  {
    id: text("id").primaryKey(),
    name: text("name", { length: 256 }).notNull(),
    description: text("description", { length: 512 }),
    showcaseImage: text("show_case", { length: 256 }).notNull(),
    price: int("price").notNull(),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
      categoryId: text("category_id")
      .notNull()
      .references(() => categoriesTable.id, {
        onDelete: "cascade",
      }),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => new Date()),
  },
  (product) => ({
    ProductNameIndex: index("ProductName_idx").on(product.name),
  }),
);

export const productSizesTable = createTable(
  "product_sizes",
  {
    id: text("id").primaryKey(),
    productId: text("product_id")
      .notNull()
      .references(() => productsTable.id, {
        onDelete: "cascade",
      }),
    size: int("size").notNull(),
    stock: int("stock").notNull().default(0),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => new Date(),
    ),
  },
  (product) => ({
    productIndex: index("product_idx").on(product.productId),
    checkConstraint: check("age_check1", sql`${product.stock} > 0`),
  }),
);
// src/server/db/schema.ts
// ... existing code ...

export const usersTable = createTable("users", {
  id: text("id").primaryKey(),
  externalId: text("externalId", { length: 256 }).notNull().unique(),
  firstName: text("firstName", { length: 256 }).notNull(),
  lastName: text("lastName", { length: 256 }),
  email: text("email", { length: 256 }).unique(),
  phoneNumber: text("phone_number", { length: 1024 }),
  createdAt: int("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
});

export const orderTable = createTable("orderTable", {
  id: text("id").primaryKey(),
  status: text("status").default("pending"),
  orderDate: int("order_date", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
    firstName: text("first_name").notNull(),
    phoneNumber: text("phone_number").notNull(),
    lastName: text("last_name").notNull(),
    wilaya: text("wilaya").notNull(),
    baladia: text("baladia").notNull(),
  updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
});

// export const ClientTable = createTable(
//   "CLientTable",
//   {
//     id: text("id").primaryKey(),
   
//     createdAt: int("created_at", { mode: "timestamp" })
//       .default(sql`(unixepoch())`)
//       .notNull(),
//     updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
//       () => new Date(),
//     ),
//   },
//   (client) => ({
//     PhoneIndex: index("phoneIndex").on(client.phoneNumber),
//   }),
// );

export const productsOrderedTable = createTable(
  "products_Ordered",
  {
    id: text("id").primaryKey(),
    quantity: int("quantity", { mode: "number" }).notNull(),
    price: int("price").notNull(),
    orderId: text("order_id")
      .notNull()
      .references(() => orderTable.id),
    productId: text("product_id")
      .notNull()
      .references(() => productsTable.id),
  },
  (ordered) => ({
    orderIndex: index("order_made_idx").on(ordered.orderId),
    productIndex: index("product_ordered_idx").on(ordered.productId),
  }),
);

export const ImagesTable = createTable(
  "images",
  {
    id: text("id").primaryKey(),
    productId: text("product_id")
      .notNull()
      .references(() => productsTable.id, {
        onDelete: "cascade",
      }),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => new Date(),
    ),
  },
  (product) => ({
    productIndex: index("imageProduct_idx").on(product.productId),
  }),
);
