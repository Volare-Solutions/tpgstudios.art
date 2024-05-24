ALTER TABLE "email_list" ADD COLUMN "phone_number" text;--> statement-breakpoint
ALTER TABLE "email_list" ADD COLUMN "shirt_size" text;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "customer_email" text;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "customer_name" text;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "customer_address" jsonb;