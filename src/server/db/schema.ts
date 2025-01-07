import {
  pgTable,
  index,
  foreignKey,
  text,
  timestamp,
  unique,
  integer,
} from "drizzle-orm/pg-core";

export const images = pgTable(
  "images",
  {
    id: text("id").primaryKey().notNull(),
    productId: text("product_id").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
    imageUrl: text("image_url").notNull(),
  },
  (table) => {
    return {
      imageProductIdx: index("imageProduct_idx").using(
        "btree",
        table.productId.asc().nullsLast(),
      ),
      imagesProductIdProductsIdFk: foreignKey({
        columns: [table.productId],
        foreignColumns: [products.id],
        name: "images_product_id_products_id_fk",
      }).onDelete("cascade"),
    };
  },
);

// export const categories = pgTable("categories", {
//   id: text("id").primaryKey().notNull(),
//   name: text("name").notNull(),
//   description: text("description"),
//   createdAt: timestamp("created_at", { mode: "string" }),
//   updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
// });

export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey().notNull(),
    externalId: text("external_id").notNull(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name"),
    email: text("email"),
    phoneNumber: text("phone_number"),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
  },
  (table) => {
    return {
      usersExternalIdUnique: unique("users_external_id_unique").on(
        table.externalId,
      ),
      usersEmailUnique: unique("users_email_unique").on(table.email),
    };
  },
);

export const products = pgTable(
  "products",
  {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    modelId: text("model_id")
      .notNull()
      .references(() => shoeModels.id),
    description: text("description"),
    showCase: text("show_case").notNull(),
    price: integer("price").notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
  },
  (table) => {
    return {
      productNameIdx: index("ProductName_idx").using(
        "btree",
        table.name.asc().nullsLast(),
      ),
    };
  },
);

// removed categ field

// categoryId: text("category_id").notNull(),

// productsCategoryIdCategoriesIdFk: foreignKey({
// 	columns: [table.categoryId],
// 	foreignColumns: [categories.id],
// 	name: "products_category_id_categories_id_fk",
//   }).onDelete("cascade"),

export const shoeModels = pgTable("shoe_models", {
  id: text("id").primaryKey().notNull(),
  modelName: text("model_name").notNull(),
  brand: text("brand").notNull(),
  mobileImage: text("mobile_image").notNull(),
  desktopImage: text("desktop_image").notNull(),
});

export const orders = pgTable("orders", {
  id: text("id").primaryKey().notNull(),
  status: text("status").default("pending"),
  orderDate: timestamp("order_date", { mode: "string" }).defaultNow().notNull(),
  fullName: text("full_name").notNull(),
  phoneNumber: text("phone_number").notNull(),
  wilaya: text("wilaya").notNull(),
  baladia: text("baladia").notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
  livraison: text("livraison").default("bereau").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }),
});

export const productSizes = pgTable(
  "product_sizes",
  {
    id: text("id").primaryKey().notNull(),
    productId: text("product_id").notNull(),
    size: integer("size").notNull(),
    stock: integer("stock").default(0).notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
  },
  (table) => {
    return {
      productIdx: index("product_idx").using(
        "btree",
        table.productId.asc().nullsLast(),
      ),
      productSizesProductIdProductsIdFk: foreignKey({
        columns: [table.productId],
        foreignColumns: [products.id],
        name: "product_sizes_product_id_products_id_fk",
      }).onDelete("cascade"),
    };
  },
);

export const productsOrdered = pgTable(
  "products_ordered",
  {
    id: text("id").primaryKey().notNull(),
    quantity: integer("quantity").notNull(),
    price: integer("price").notNull(),
    orderId: text("order_id").notNull(),
    productId: text("product_id").notNull(),
  },
  (table) => {
    return {
      orderMadeIdx: index("order_made_idx").using(
        "btree",
        table.orderId.asc().nullsLast(),
      ),
      productOrderedIdx: index("product_ordered_idx").using(
        "btree",
        table.productId.asc().nullsLast(),
      ),
      productsOrderedOrderIdOrdersIdFk: foreignKey({
        columns: [table.orderId],
        foreignColumns: [orders.id],
        name: "products_ordered_order_id_orders_id_fk",
      }),
      productsOrderedProductIdProductsIdFk: foreignKey({
        columns: [table.productId],
        foreignColumns: [products.id],
        name: "products_ordered_product_id_products_id_fk",
      }),
    };
  },
);
