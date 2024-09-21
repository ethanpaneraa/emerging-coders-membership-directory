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
ALTER TABLE "emerging-coders-membership-directory_users" ADD COLUMN "gender" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "emerging-coders-membership-directory_users" ADD COLUMN "prefered_name" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "emerging-coders-membership-directory_users" ADD COLUMN "is_dual_degree_student" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "emerging-coders-membership-directory_users" ADD COLUMN "has_minor" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "emerging-coders-membership-directory_users" ADD COLUMN "graduation_year" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "emerging-coders-membership-directory_users" ADD COLUMN "second_major" varchar(256) DEFAULT '';--> statement-breakpoint
ALTER TABLE "emerging-coders-membership-directory_users" ADD COLUMN "minor" varchar(256) DEFAULT '';--> statement-breakpoint
ALTER TABLE "emerging-coders-membership-directory_users" ADD COLUMN "is_alumni" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "emerging-coders-membership-directory_users" ADD COLUMN "is_current_student" boolean NOT NULL;--> statement-breakpoint
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
