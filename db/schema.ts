import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  text,
  decimal,
  integer,
  boolean,
  serial,
  primaryKey,
  pgEnum,
  jsonb,
} from "drizzle-orm/pg-core";

// Categories

export const categories = pgTable("category", {
  id: uuid("id").primaryKey().notNull(),
  parentId: uuid("parent_id"),
  name: varchar("name", { length: 255 }).notNull(),
  categoryType: varchar("category_type", { length: 255 }).notNull(), // "main", "type", "usage", "seasonal" etc.
  attributes: jsonb("attributes").notNull(),
  createdAt: timestamp("created_at")
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$defaultFn(() => new Date()),
});

// Products

// export const products = pgTable("product", {
//   id: uuid("id").primaryKey().notNull(),
//   name: varchar("name").notNull(),
//   description: text("description").notNull(),
//   slug: varchar("slug").notNull().unique("product_slug"),
//   categoryId: uuid("category_id")
//     .notNull()
//     .references(() => categories.id, { onDelete: "cascade" }),
//   brandId: uuid("brand_id").notNull(),
//   countryOfOrigin: varchar("country_of_origin", { length: 144 }).notNull(),
//   sku: varchar("sku", { length: 144 }).unique("product_sku"),
//   hsnCode: varchar("hsn_code", { length: 144 }).notNull(),
//   productCode: varchar("product_code", { length: 144 }).notNull(),
//   mrp: decimal("mrp", { precision: 10, scale: 2 }).notNull(),
//   discount: decimal("discount", { precision: 10, scale: 2 }).notNull(),
//   stock: integer().notNull(),

//   status: boolean()
//     .notNull()
//     .$default(() => true),
//   createdAt: timestamp("created_at")
//     .notNull()
//     .$defaultFn(() => new Date()),
//   updatedAt: timestamp("updated_at")
//     .notNull()
//     .$defaultFn(() => new Date()),
// });

// // Product Variants (Sizes, Colors)

// export const variants = pgTable("variant", {
//   id: serial("id").primaryKey().notNull(),
//   name: varchar("name", { length: 255 }).notNull(),
//   value: varchar("value", { length: 255 }).notNull(),
// });

// export const productVariants = pgTable("product_variant", {
//   productId: uuid("product_id")
//     .notNull()
//     .references(() => products.id, { onDelete: "cascade" }),
//   variantId: integer("variant_id")
//     .notNull()
//     .references(() => variants.id, { onDelete: "cascade" }),
//   sku: varchar("sku", { length: 144 }).unique("product_variant_sku"),
//   mrp: decimal("mrp", { precision: 10, scale: 2 }).notNull(),
//   stock: integer().notNull(),
//   images: text("images").notNull(),
//   thumbnail: varchar("thumbnail", { length: 512 }).notNull(),
//   createdAt: timestamp("created_at")
//     .notNull()
//     .$defaultFn(() => new Date()),
//   updatedAt: timestamp("updated_at")
//     .notNull()
//     .$defaultFn(() => new Date()),
// });

// // Product Attributes (Material, Etc)

// export const attributeTypes = pgTable("attribute_type", {
//   id: serial("id").primaryKey().notNull(),
//   name: varchar("name", { length: 255 }).notNull(),
//   slug: varchar("slug", { length: 255 }).notNull(),
// });

// export const attributes = pgTable("attribute", {
//   id: serial("id").primaryKey().notNull(),
//   attributeTypeId: integer("attribute_type_id")
//     .notNull()
//     .references(() => attributeTypes.id, { onDelete: "cascade" }),
//   value: varchar("value", { length: 255 }).notNull(),
//   slug: varchar("slug", { length: 255 }).notNull(),
// });

// export const productAttributes = pgTable(
//   "product_attribute",
//   {
//     productId: uuid("product_id")
//       .notNull()
//       .references(() => products.id, { onDelete: "cascade" }),
//     attributeId: integer("attribute_id")
//       .notNull()
//       .references(() => attributes.id, { onDelete: "cascade" }),
//   },
//   (table) => [
//     primaryKey({
//       name: "product_attribute_composite_key",
//       columns: [table.productId, table.attributeId],
//     }),
//   ],
// );

// // Brands

// export const brands = pgTable("brand", {
//   id: uuid("id").primaryKey().notNull(),
//   name: varchar("name", { length: 255 }).notNull(),
//   description: text("description").notNull(),
//   logo: varchar("logo", { length: 512 }).notNull(),
//   website: varchar("website", { length: 512 }),
//   createdAt: timestamp("created_at")
//     .notNull()
//     .$defaultFn(() => new Date()),
//   updatedAt: timestamp("updated_at")
//     .notNull()
//     .$defaultFn(() => new Date()),
// });

// // Orders

// const OrderStatus = pgEnum("order_status", [
//   "pending",
//   "confirmed",
//   "shipped",
//   "delivered",
//   "cancelled",
// ]);

// const PaymentStatus = pgEnum("payment_status", ["paid", "unpaid", "refunded"]);

// export const orders = pgTable("order", {
//   id: uuid("id").primaryKey().notNull(),
//   orderCode: varchar("order_code", { length: 255 })
//     .notNull()
//     .unique("order_code"),
//   customerId: uuid("customer_id").notNull(),
//   totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
//   discount: decimal("discount", { precision: 10, scale: 2 }),
//   status: OrderStatus()
//     .notNull()
//     .$defaultFn(() => "pending"),

//   paymentStatus: PaymentStatus()
//     .notNull()
//     .$defaultFn(() => "unpaid"),
//   shippingAddress: text("shipping_address").notNull(),
//   createdAt: timestamp("created_at")
//     .notNull()
//     .$defaultFn(() => new Date()),
//   updatedAt: timestamp("updated_at")
//     .notNull()
//     .$defaultFn(() => new Date()),
// });

// export const orderItems = pgTable("order_item", {
//   orderId: uuid("order_id")
//     .notNull()
//     .references(() => orders.id, { onDelete: "cascade" }),
//   productId: uuid("product_id")
//     .notNull()
//     .references(() => products.id, { onDelete: "cascade" }),
//   productVariantId: integer("variant_id")
//     .notNull()
//     .references(() => productVariants.variantId),
//   quantity: integer().notNull(),
//   price: decimal("price", { precision: 10, scale: 2 }).notNull(),
//   discount: decimal("discount", { precision: 10, scale: 2 }),
//   totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
//   createdAt: timestamp("created_at")
//     .notNull()
//     .$defaultFn(() => new Date()),
//   updatedAt: timestamp("updated_at")
//     .notNull()
//     .$defaultFn(() => new Date()),
// });

// // Transactions

// const PaymentMethod = pgEnum("payment_method", [
//   "cod",
//   "card",
//   "upi",
//   "netbanking",
// ]);
// const TransactionType = pgEnum("transaction_type", ["payment", "refund"]);
// const TransactionStatus = pgEnum("transaction_status", [
//   "success",
//   "failed",
//   "pending",
//   "refunded",
// ]);

// export const transactions = pgTable("transaction", {
//   id: serial().primaryKey().notNull(),
//   orderId: uuid("order_id")
//     .notNull()
//     .references(() => orders.id, { onDelete: "cascade" }),
//   customerId: uuid().notNull(), // Customer who made the payment will reference here
//   amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
//   transactionType: TransactionType().notNull(),
//   paymentMethod: PaymentMethod().notNull(),
//   paymentTransactionId: varchar("payment_transaction_id", { length: 255 }),
//   status: TransactionStatus()
//     .notNull()
//     .$defaultFn(() => "pending"),
//   transactionAt: timestamp("transaction_at")
//     .notNull()
//     .$defaultFn(() => new Date()),
//   createdAt: timestamp("created_at")
//     .notNull()
//     .$defaultFn(() => new Date()),
// });

// // Shipping

// export const shippingMethods = pgTable("shipping_method", {
//   id: serial("id").primaryKey().notNull(),
//   name: varchar("name", { length: 255 }).notNull(),
//   description: text("description"),
//   cost: decimal("cost", { precision: 10, scale: 2 }).notNull(),
//   createdAt: timestamp("created_at")
//     .notNull()
//     .$defaultFn(() => new Date()),
//   updatedAt: timestamp("updated_at")
//     .notNull()
//     .$defaultFn(() => new Date()),
// });
