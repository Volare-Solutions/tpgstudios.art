CREATE TABLE IF NOT EXISTS "assets" (
	"id" text PRIMARY KEY NOT NULL,
	"desktop_logo" text NOT NULL,
	"mobile_logo" text NOT NULL,
	"desktop_home_image" text NOT NULL,
	"mobile_home_image" text NOT NULL,
	"home_title" text NOT NULL,
	"home_subtitle" text NOT NULL
);
