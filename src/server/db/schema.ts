// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  timestamp,
  varchar,
  serial,
  boolean,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(
  (name) => `emerging-coders-membership-directory_${name}`,
);

export const users = createTable(
  "users",
  {
    id: varchar("id", { length: 256 }).primaryKey(),
    first_name: varchar("first_name", { length: 256 }).notNull(),
    last_name: varchar("last_name", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).unique().notNull(),
    gender: varchar("gender", { length: 256 }).notNull(),
    prefered_name: varchar("prefered_name", { length: 256 }).notNull(),
    is_dual_degree_student: boolean("is_dual_degree_student").notNull(),
    second_home_school: varchar("second_home_school", { length: 256 }).default(
      "",
    ),
    has_minor: boolean("has_minor").notNull(),
    pronouns: varchar("pronouns", { length: 256 }).default("").notNull(),
    hashedPassword: varchar("hashed_password", { length: 256 }).notNull(),
    graduation_year: varchar("graduation_year", { length: 256 }).notNull(),
    profile_picture: varchar("profile_picture", { length: 256 }),
    major: varchar("major", { length: 256 }).notNull(),
    has_second_major: boolean("has_second_major").notNull(),
    second_major: varchar("second_major", { length: 256 }).default(""),
    minor: varchar("minor", { length: 256 }).default(""),
    home_school: varchar("home_school", { length: 256 }).notNull(),
    is_alumni: varchar("is_alumni").notNull(),
    is_current_student: varchar("is_current_student").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", {
      withTimezone: true,
      mode: "date",
    })
      .default(sql`CURRENT_TIMESTAMP`)
      .$onUpdate(() => new Date()),
  },
  (t) => ({
    emailIndex: index("email_idx").on(t.email),
  }),
);

export const profile = createTable("profile", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id")
    .references(() => users.id)
    .notNull(),
  bio: varchar("bio", { length: 256 }).notNull(),
  interests: varchar("interests", { length: 256 }).notNull(),
  skills: varchar("skills", { length: 256 }).notNull(),
  linkedln_url: varchar("linkedln_url", { length: 256 }).default(""),
  github_url: varchar("github_url", { length: 256 }).default(""),
  website_url: varchar("website_url", { length: 256 }).default(""),
  resume_url: varchar("resume_url", { length: 256 }).default(""),
  avatar_url: varchar("avatar_url", { length: 256 }).default(""),
  profileImageId: uuid("profile_image_id").default(sql`uuid_generate_v4()`),
});

export const workExperiences = createTable("work_experiences", {
  id: serial("id").primaryKey(),
  employment_type: varchar("employment_type", { length: 256 }).notNull(),
  company_name: varchar("company_name", { length: 256 }).notNull(),
  job_title: varchar("job_title", { length: 256 }).notNull(),
  city_location: varchar("city_location", { length: 256 }).notNull(),
  state_location: varchar("state_location", { length: 256 }).notNull(),
  start_date: timestamp("start_date", { withTimezone: true }).notNull(),
  end_date: timestamp("end_date", { withTimezone: true }).notNull(),
  is_current_job: boolean("is_current_job").notNull(),
  user_id: varchar("user_id")
    .references(() => users.id)
    .notNull(),
});

export const events = createTable("events", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }).notNull(),
  start_date: timestamp("start_date", { withTimezone: true }).notNull(),
  end_date: timestamp("end_date", { withTimezone: true }).notNull(),
  location: varchar("location", { length: 256 }).notNull(),
  instagram_url: varchar("instagram_url", { length: 256 }).default(""),
  photo_link: varchar("photo_link", { length: 256 }).default(""),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const sessions = createTable(
  "sessions",
  {
    id: varchar("id", { length: 256 }).primaryKey(),
    userId: varchar("user_id", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
  },
  (t) => ({
    userIdIndex: index("user_id_idx").on(t.userId),
  }),
);
