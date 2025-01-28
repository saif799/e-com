import { pgTable, index, foreignKey, text, integer, timestamp, unique, numeric } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const products = pgTable("products", {
	id: text().primaryKey().notNull(),
	name: text().notNull(),
	description: text(),
	showCase: text("show_case").notNull(),
	price: integer().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	modelId: text("model_id").notNull(),
}, (table) => [
	index("ProductName_idx").using("btree", table.name.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.modelId],
			foreignColumns: [shoeModels.id],
			name: "products_model_id_shoe_models_id_fk"
		}).onUpdate("cascade").onDelete("set null"),
]);

export const users = pgTable("users", {
	id: text().primaryKey().notNull(),
	externalId: text("external_id").notNull(),
	firstName: text("first_name").notNull(),
	lastName: text("last_name"),
	email: text(),
	phoneNumber: text("phone_number"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	unique("users_external_id_unique").on(table.externalId),
	unique("users_email_unique").on(table.email),
]);

export const shoeModels = pgTable("shoe_models", {
	id: text().primaryKey().notNull(),
	modelName: text("model_name").notNull(),
	brand: text().notNull(),
	mobileImage: text("mobile_image"),
	desktopImage: text("desktop_image"),
});

export const orders = pgTable("orders", {
	id: text().primaryKey().notNull(),
	status: text().default('pending'),
	orderDate: timestamp("order_date", { mode: 'string' }).defaultNow().notNull(),
	fullName: text("full_name").notNull(),
	phoneNumber: text("phone_number").notNull(),
	wilaya: text().notNull(),
	baladia: text().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	livraison: text().default('bereau').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
});

export const productsOrdered = pgTable("products_ordered", {
	id: text().primaryKey().notNull(),
	quantity: integer().notNull(),
	price: integer().notNull(),
	orderId: text("order_id").notNull(),
	productId: text("product_id").notNull(),
}, (table) => [
	index("order_made_idx").using("btree", table.orderId.asc().nullsLast().op("text_ops")),
	index("product_ordered_idx").using("btree", table.productId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.orderId],
			foreignColumns: [orders.id],
			name: "products_ordered_order_id_orders_id_fk"
		}),
	foreignKey({
			columns: [table.productId],
			foreignColumns: [products.id],
			name: "products_ordered_product_id_products_id_fk"
		}),
]);

export const productSizes = pgTable("product_sizes", {
	id: text().primaryKey().notNull(),
	productId: text("product_id").notNull(),
	size: numeric().notNull(),
	stock: integer().default(0).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	index("product_idx").using("btree", table.productId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.productId],
			foreignColumns: [products.id],
			name: "product_sizes_product_id_products_id_fk"
		}).onDelete("cascade"),
]);

export const images = pgTable("images", {
	id: text().primaryKey().notNull(),
	productId: text("product_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	imageUrl: text("image_url").notNull(),
}, (table) => [
	index("imageProduct_idx").using("btree", table.productId.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.productId],
			foreignColumns: [products.id],
			name: "images_product_id_products_id_fk"
		}).onDelete("cascade"),
]);
