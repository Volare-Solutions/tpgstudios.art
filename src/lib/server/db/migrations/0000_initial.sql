DO $$ BEGIN
 CREATE TYPE "provider" AS ENUM('google', 'github');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('new', 'placed', 'packaged', 'sent');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "email_list" (
	"email" text PRIMARY KEY NOT NULL,
	"subscribed_at" timestamp NOT NULL,
	"unsubscribed_at" timestamp,
	"key" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order" (
	"stripe_order_id" text PRIMARY KEY NOT NULL,
	"stripe_customer_id" text,
	"total_price" integer NOT NULL,
	"timestamp" timestamp NOT NULL,
	"status" "status" DEFAULT 'new' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_product" (
	"id" text PRIMARY KEY NOT NULL,
	"product_size_code" text NOT NULL,
	"quantity" integer NOT NULL,
	"order_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"desc" text NOT NULL,
	"gradient_color_start" text DEFAULT 'from-red-600' NOT NULL,
	"gradient_color_via" text DEFAULT 'via-purple-500' NOT NULL,
	"gradient_color_end" text DEFAULT 'to-indigo-400' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_image" (
	"cloudinary_id" text PRIMARY KEY NOT NULL,
	"product_id" text NOT NULL,
	"width" integer NOT NULL,
	"height" integer NOT NULL,
	"is_vertical" boolean DEFAULT false NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"is_primary" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_review" (
	"id" text PRIMARY KEY NOT NULL,
	"rating" integer NOT NULL,
	"review_text" text,
	"product_id" text,
	"timestamp" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_size" (
	"code" text PRIMARY KEY NOT NULL,
	"name" text DEFAULT 'my product' NOT NULL,
	"is_available" boolean DEFAULT true NOT NULL,
	"price" integer NOT NULL,
	"size" text NOT NULL,
	"stripe_price_id" text NOT NULL,
	"stripe_product_id" text NOT NULL,
	"product_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_tag" (
	"name" text PRIMARY KEY NOT NULL,
	"desc" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_to_product_tag" (
	"product_id" text NOT NULL,
	"tag_id" text NOT NULL,
	CONSTRAINT "product_to_product_tag_product_id_tag_id_pk" PRIMARY KEY("product_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text NOT NULL,
	"provider" "provider",
	"provider_id" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"is_admin" boolean NOT NULL,
	"email" text NOT NULL,
	"stripe_customer_id" text,
	CONSTRAINT "user_provider_provider_id_pk" PRIMARY KEY("provider","provider_id"),
	CONSTRAINT "user_id_unique" UNIQUE("id"),
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_stripe_customer_id_unique" UNIQUE("stripe_customer_id")
);
