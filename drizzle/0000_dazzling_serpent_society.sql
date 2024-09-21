CREATE TABLE IF NOT EXISTS "emerging-coders-membership-directory_sessions" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "emerging-coders-membership-directory_users" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"email" varchar(256) NOT NULL,
	"hashed_password" varchar(256) NOT NULL,
	"profile_picture" varchar(256),
	"major" varchar(256) NOT NULL,
	"home_school" varchar(256) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "emerging-coders-membership-directory_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "emerging-coders-membership-directory_sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_idx" ON "emerging-coders-membership-directory_users" USING btree ("email");