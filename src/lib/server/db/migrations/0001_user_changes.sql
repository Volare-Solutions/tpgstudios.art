ALTER TYPE "provider" ADD VALUE 'email';--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "user_provider_provider_id_pk";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "is_admin" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_id_email_pk" PRIMARY KEY("id","email");--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "password" text;