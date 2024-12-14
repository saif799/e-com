// import { sql } from "drizzle-orm";
import { sql } from "drizzle-orm";
import {
  check,
  index,
  text,
  timestamp,
  integer,
  pgTable,
} from "drizzle-orm/pg-core";

// For PostgreSQL, we don't need the table creator helper
// as pgTable handles this for us

export const categoriesTable = pgTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
});

export const productsTable = pgTable(
  "products",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    showcaseImage: text("show_case").notNull(),
    price: integer("price").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    categoryId: text("category_id")
      .notNull()
      .references(() => categoriesTable.id, {
        onDelete: "cascade",
      }),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (product) => ({
    ProductNameIndex: index("ProductName_idx").on(product.name),
  }),
);

export const productSizesTable = pgTable(
  "product_sizes",
  {
    id: text("id").primaryKey(),
    productId: text("product_id")
      .notNull()
      .references(() => productsTable.id, {
        onDelete: "cascade",
      }),
    size: integer("size").notNull(),
    stock: integer("stock").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (product) => ({
    productIndex: index("product_idx").on(product.productId),
    checkConstraint: check("stock_check", sql`stock > 0`),
  }),
);

export const usersTable = pgTable("users", {
  id: text("id").primaryKey(),
  externalId: text("external_id").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name"),
  email: text("email").unique(),
  phoneNumber: text("phone_number"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const orderTable = pgTable("orders", {
  // Changed from orderTable to orders for conventional naming
  id: text("id").primaryKey(),
  status: text("status").default("pending"),
  orderDate: timestamp("order_date").defaultNow().notNull(),
  fullName: text("full_name").notNull(),
  phoneNumber: text("phone_number").notNull(),
  wilaya: text("wilaya").notNull(),
  baladia: text("baladia").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const productsOrderedTable = pgTable(
  "products_ordered", // Changed from products_Ordered to products_ordered for conventional naming
  {
    id: text("id").primaryKey(),
    quantity: integer("quantity").notNull(),
    price: integer("price").notNull(),
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

export const ImagesTable = pgTable(
  "images",
  {
    id: text("id").primaryKey(),
    productId: text("product_id")
      .notNull()
      .references(() => productsTable.id, {
        onDelete: "cascade",
      }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (product) => ({
    productIndex: index("imageProduct_idx").on(product.productId),
  }),
);
