import { relations } from 'drizzle-orm';
import {
	pgTable,
	pgEnum,
	text,
	timestamp,
	boolean,
	primaryKey,
	integer,
  } from 'drizzle-orm/pg-core';

export const providerEnum = pgEnum('provider', ['google', 'github', 'email']);

export const user = pgTable(
	'user',
	{
		id: text('id').unique().notNull(),
		provider: providerEnum('provider'),
		providerId: text('provider_id').notNull(),
		firstName: text('first_name').notNull(),
		lastName: text('last_name').notNull(),
		isAdmin: boolean('is_admin').notNull().default(false),
		email: text('email').notNull().unique(),
		stripeCustomerId: text('stripe_customer_id').unique(),
		password: text('password'),
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.id, table.email] })
		};
	}
);

export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session)
}));

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull(),
	expiresAt: timestamp('expires_at').notNull()
});

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	})
}));

export const emailList = pgTable('email_list', {
	email: text('email').primaryKey(),
	subscribedAt: timestamp('subscribed_at').notNull(),
	unsubscribedAt: timestamp('unsubscribed_at'),
	key: text('key').notNull()
});

export const product = pgTable('product', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	desc: text('desc').notNull(),
	gradientColorStart: text('gradient_color_start')
		.notNull()
		.default('from-red-600'),
	gradientColorVia: text('gradient_color_via')
		.notNull()
		.default('via-purple-500'),
	gradientColorStop: text('gradient_color_end')
		.notNull()
		.default('to-indigo-400')
});

export const productRelations = relations(product, ({ many }) => ({
	tags: many(productToProductTag),
	sizes: many(productSize),
	images: many(productImage),
	reviews: many(productReview)
}));

export const productToProductTag = pgTable(
	'product_to_product_tag',
	{
		productId: text('product_id').notNull(),
		tagId: text('tag_id').notNull()
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.productId, table.tagId] })
		};
	}
);

export const productToProductTagRelations = relations(productToProductTag, ({ one }) => ({
	product: one(product, {
		fields: [productToProductTag.productId],
		references: [product.id]
	}),
	tag: one(productTag, {
		fields: [productToProductTag.tagId],
		references: [productTag.name]
	})
}));

export const productTag = pgTable('product_tag', {
	name: text('name').primaryKey(),
	desc: text('desc').notNull(),
	active: boolean('active').notNull().default(true)
});

export const productTagRelations = relations(productTag, ({ many }) => ({
	products: many(productToProductTag)
}));

export const productSize = pgTable('product_size', {
	code: text('code').primaryKey(),
	name: text('name').notNull().default('my product'),
	isAvailable: boolean('is_available').notNull().default(true),
	price: integer('price').notNull(),
	size: text('size').notNull(),
	stripePriceId: text('stripe_price_id').notNull(),
	stripeProductId: text('stripe_product_id').notNull(),
	productId: text('product_id').notNull()
});

export const productSizeRelations = relations(productSize, ({ one }) => ({
	product: one(product, {
		fields: [productSize.productId],
		references: [product.id]
	})
}));

export const productImage = pgTable('product_image', {
	cloudinaryId: text('cloudinary_id').primaryKey(),
	productId: text('product_id').notNull(),
	width: integer('width').notNull(),
	height: integer('height').notNull(),
	isVertical: boolean('is_vertical').notNull().default(false),
	order: integer('order').notNull().default(0),
	isPrimary: boolean('is_primary').default(false).notNull()
});

export const productImageRelations = relations(productImage, ({ one }) => ({
	product: one(product, {
		fields: [productImage.productId],
		references: [product.id]
	})
}));

export const productReview = pgTable('product_review', {
	id: text('id').primaryKey(),
	rating: integer('rating').notNull(),
	reviewText: text('review_text'),
	productId: text('product_id'),
	timestamp: timestamp('timestamp').$defaultFn(() => new Date())
});

export const productReviewRelations = relations(productReview, ({ one }) => ({
	product: one(product, {
		fields: [productReview.productId],
		references: [product.id]
	})
}));

export const statusEnum = pgEnum('status', ['new', 'placed', 'packaged', 'sent']);

export const order = pgTable('order', {
	// this is really the checkout session id
	stripeOrderId: text('stripe_order_id').primaryKey(),
	stripeCustomerId: text('stripe_customer_id'),
	totalPrice: integer('total_price').notNull(),
	timestamp: timestamp('timestamp').notNull(),
	status: statusEnum('status').notNull().default('new')
});

export const orderRelations = relations(order, ({ many }) => ({
	products: many(orderProduct)
}));

export const orderProduct = pgTable('order_product', {
	id: text('id').primaryKey(),
	productSizeCode: text('product_size_code').notNull(),
	quantity: integer('quantity').notNull(),
	orderId: text('order_id').notNull()
});

export const orderProductRelations = relations(orderProduct, ({ one }) => ({
	order: one(order, {
		fields: [orderProduct.orderId],
		references: [order.stripeOrderId]
	})
}));

export const assets = pgTable('assets', {
	id: text('id').primaryKey(),
	desktopLogo: text('desktop_logo').notNull(),
	mobileLogo: text('mobile_logo').notNull(),
	desktopHomeImage: text('desktop_home_image').notNull(),
	mobileHomeImage: text('mobile_home_image').notNull(),
	homeTitle: text('home_title').notNull(),
	homeSubtitle: text('home_subtitle').notNull()
});
