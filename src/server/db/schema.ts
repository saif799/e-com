// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `${name}`);

export const categories = createTable("categories", {
  id: text("id").primaryKey(),
  name: text("name", { length: 256 }).notNull(),
  description: text("description", { length: 512 }),
});

export const products = createTable(
  "products",
  {
    id: text("id").primaryKey(),
    name: text("name", { length: 256 }).notNull(),
    description: text("description", { length: 512 }),
    showcaseImage: text("show_case", { length: 256 }),
    price: text("price", { length: 256 }),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => new Date(),
    ),
  },
  (product) => ({
    ProductNameIndex: index("ProductName_idx").on(product.name),
  }),
);
export const sizes = createTable(
  "sizes",
  {
    id: text("id").primaryKey(),
    name: text("name", { length: 50 }).notNull().unique(), // e.g., "S", "M", "L", "XL"
    displayOrder: int("display_order").default(0),
  },
  (size) => ({
    sizeNameIndex: index("name_idx").on(size.name),
  }),
);

export const productSizes = createTable(
  "product_sizes",
  {
    id: text("id").primaryKey(),
    productId: text("product_id")
      .notNull()
      .references(() => products.id, {
        onDelete: "cascade",
      }),
    sizeId: text("size_id")
      .notNull()
      .references(() => sizes.id, {
        onDelete: "restrict",
      }),
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
export const orders = createTable(
  "orders",
  {
    id: text("id").primaryKey(),
    productId: text("product_id")
      .notNull()
      .references(() => products.id),
    quantity: int("quantity", { mode: "number" }).notNull(),
    orderDate: int("order_date", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    customerId: text("customer_id", { length: 256 })
      .notNull()
      .references(() => usersTable.id),
  },
  (order) => ({
    customerIndex: index("customer_idx").on(order.customerId),
    productIndex: index("productOrder_idx").on(order.productId),
  }),
);

export const Images = createTable(
  "images",
  {
    id: text("id").primaryKey(),
    productId: text("product_id")
      .notNull()
      .references(() => products.id, {
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
