CREATE TABLE IF NOT EXISTS "emerging-coders-membership-directory_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" varchar(256) NOT NULL,
	"start_date" timestamp with time zone NOT NULL,
	"end_date" timestamp with time zone NOT NULL,
	"location" varchar(256) NOT NULL,
	"instagram_url" varchar(256) DEFAULT '',
	"photo_link" varchar(256) DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "emerging-coders-membership-directory_profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"bio" varchar(256) NOT NULL,
	"interests" varchar(256) NOT NULL,
	"skills" varchar(256) NOT NULL,
	"linkedln_url" varchar(256) DEFAULT '',
	"github_url" varchar(256) DEFAULT '',
	"website_url" varchar(256) DEFAULT '',
	"resume_url" varchar(256) DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "emerging-coders-membership-directory_sessions" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"user_id" varchar(256) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "emerging-coders-membership-directory_users" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"first_name" varchar(256) NOT NULL,
	"last_name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"gender" varchar(256) NOT NULL,
	"prefered_name" varchar(256) NOT NULL,
	"is_dual_degree_student" boolean NOT NULL,
	"second_home_school" varchar(256) DEFAULT '',
	"has_minor" boolean NOT NULL,
	"pronouns" varchar(256) DEFAULT '' NOT NULL,
	"hashed_password" varchar(256) NOT NULL,
	"graduation_year" varchar(256) NOT NULL,
	"profile_picture" varchar(256),
	"major" varchar(256) NOT NULL,
	"has_second_major" boolean NOT NULL,
	"second_major" varchar(256) DEFAULT '',
	"minor" varchar(256) DEFAULT '',
	"home_school" varchar(256) NOT NULL,
	"is_alumni" boolean NOT NULL,
	"is_current_student" boolean NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "emerging-coders-membership-directory_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "emerging-coders-membership-directory_work_experiences" (
	"id" serial PRIMARY KEY NOT NULL,
	"employment_type" varchar(256) NOT NULL,
	"company_name" varchar(256) NOT NULL,
	"job_title" varchar(256) NOT NULL,
	"city_location" varchar(256) NOT NULL,
	"state_location" varchar(256) NOT NULL,
	"start_date" timestamp with time zone NOT NULL,
	"end_date" timestamp with time zone NOT NULL,
	"is_current_job" boolean NOT NULL,
	"user_id" varchar NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "emerging-coders-membership-directory_profile" ADD CONSTRAINT "emerging-coders-membership-directory_profile_user_id_emerging-coders-membership-directory_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."emerging-coders-membership-directory_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "emerging-coders-membership-directory_work_experiences" ADD CONSTRAINT "emerging-coders-membership-directory_work_experiences_user_id_emerging-coders-membership-directory_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."emerging-coders-membership-directory_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_idx" ON "emerging-coders-membership-directory_sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "email_idx" ON "emerging-coders-membership-directory_users" USING btree ("email");