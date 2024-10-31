CREATE TABLE IF NOT EXISTS "hoodie_signups" (
	"email" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"size" text NOT NULL
);
