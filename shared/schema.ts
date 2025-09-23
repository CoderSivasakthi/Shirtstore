import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phone: text("phone"),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  basePrice: decimal("base_price", { precision: 10, scale: 2 }).notNull(),
  brand: text("brand").notNull(),
  category: text("category").notNull(),
  material: text("material").notNull(),
  pattern: text("pattern").notNull(), // plain, checked, printed
  fit: text("fit").notNull(), // slim, regular, loose
  sleeve: text("sleeve").notNull(), // short, long, 3/4
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  reviewCount: integer("review_count").default(0),
  images: text("images").array().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const productVariants = pgTable("product_variants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  productId: varchar("product_id").references(() => products.id).notNull(),
  color: text("color").notNull(),
  size: text("size").notNull(),
  stock: integer("stock").default(0),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  discountPercent: integer("discount_percent").default(0),
});

export const cartItems = pgTable("cart_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  variantId: varchar("variant_id").references(() => productVariants.id).notNull(),
  quantity: integer("quantity").notNull(),
  addedAt: timestamp("added_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  status: text("status").notNull(), // pending, confirmed, shipped, delivered, cancelled
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  shippingAddress: text("shipping_address").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Zod schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  firstName: true,
  lastName: true,
  phone: true,
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  description: true,
  basePrice: true,
  brand: true,
  category: true,
  material: true,
  pattern: true,
  fit: true,
  sleeve: true,
  images: true,
});

export const insertProductVariantSchema = createInsertSchema(productVariants).pick({
  productId: true,
  color: true,
  size: true,
  stock: true,
  price: true,
  discountPercent: true,
});

export const insertCartItemSchema = createInsertSchema(cartItems).pick({
  userId: true,
  variantId: true,
  quantity: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export type InsertProductVariant = z.infer<typeof insertProductVariantSchema>;
export type ProductVariant = typeof productVariants.$inferSelect;

export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type CartItem = typeof cartItems.$inferSelect;

export type Order = typeof orders.$inferSelect;

// Product with variants type for frontend
export type ProductWithVariants = Product & {
  variants: ProductVariant[];
};

// Cart item with product details
export type CartItemWithDetails = CartItem & {
  variant: ProductVariant & {
    product: Product;
  };
};