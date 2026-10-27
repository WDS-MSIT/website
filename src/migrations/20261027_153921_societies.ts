import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_societies_links_type" AS ENUM('website', 'social', 'document', 'form', 'other');
  CREATE TYPE "public"."enum_societies_category" AS ENUM('cultural', 'technical', 'academic');
  CREATE TYPE "public"."enum_societies_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__societies_v_version_links_type" AS ENUM('website', 'social', 'document', 'form', 'other');
  CREATE TYPE "public"."enum__societies_v_version_category" AS ENUM('cultural', 'technical', 'academic');
  CREATE TYPE "public"."enum__societies_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "societies_faculty_coordinators" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"designation" varchar,
  	"department" varchar,
  	"email" varchar,
  	"faculty_id" integer
  );
  
  CREATE TABLE "societies_student_leaders" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"unit" varchar,
  	"department" varchar,
  	"email" varchar,
  	"phone" varchar
  );
  
  CREATE TABLE "societies_contact_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email" varchar
  );
  
  CREATE TABLE "societies_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"type" "enum_societies_links_type" DEFAULT 'other'
  );
  
  CREATE TABLE "societies_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "societies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"category" "enum_societies_category",
  	"overview" varchar,
  	"description" jsonb,
  	"founded_on" timestamp(3) with time zone,
  	"founded_year" numeric,
  	"contact_phone" varchar,
  	"logo_id" integer,
  	"sort_order" numeric,
  	"source_url" varchar,
  	"source_snapshot_file" varchar,
  	"legacy_path" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_societies_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_societies_v_version_faculty_coordinators" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"designation" varchar,
  	"department" varchar,
  	"email" varchar,
  	"faculty_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_societies_v_version_student_leaders" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"unit" varchar,
  	"department" varchar,
  	"email" varchar,
  	"phone" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_societies_v_version_contact_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_societies_v_version_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"type" "enum__societies_v_version_links_type" DEFAULT 'other',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_societies_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_societies_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_category" "enum__societies_v_version_category",
  	"version_overview" varchar,
  	"version_description" jsonb,
  	"version_founded_on" timestamp(3) with time zone,
  	"version_founded_year" numeric,
  	"version_contact_phone" varchar,
  	"version_logo_id" integer,
  	"version_sort_order" numeric,
  	"version_source_url" varchar,
  	"version_source_snapshot_file" varchar,
  	"version_legacy_path" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__societies_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "societies_id" integer;
  ALTER TABLE "societies_faculty_coordinators" ADD CONSTRAINT "societies_faculty_coordinators_faculty_id_faculty_id_fk" FOREIGN KEY ("faculty_id") REFERENCES "public"."faculty"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "societies_faculty_coordinators" ADD CONSTRAINT "societies_faculty_coordinators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."societies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "societies_student_leaders" ADD CONSTRAINT "societies_student_leaders_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."societies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "societies_contact_emails" ADD CONSTRAINT "societies_contact_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."societies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "societies_links" ADD CONSTRAINT "societies_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."societies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "societies_gallery" ADD CONSTRAINT "societies_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "societies_gallery" ADD CONSTRAINT "societies_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."societies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "societies" ADD CONSTRAINT "societies_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_societies_v_version_faculty_coordinators" ADD CONSTRAINT "_societies_v_version_faculty_coordinators_faculty_id_faculty_id_fk" FOREIGN KEY ("faculty_id") REFERENCES "public"."faculty"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_societies_v_version_faculty_coordinators" ADD CONSTRAINT "_societies_v_version_faculty_coordinators_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_societies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_societies_v_version_student_leaders" ADD CONSTRAINT "_societies_v_version_student_leaders_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_societies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_societies_v_version_contact_emails" ADD CONSTRAINT "_societies_v_version_contact_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_societies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_societies_v_version_links" ADD CONSTRAINT "_societies_v_version_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_societies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_societies_v_version_gallery" ADD CONSTRAINT "_societies_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_societies_v_version_gallery" ADD CONSTRAINT "_societies_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_societies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_societies_v" ADD CONSTRAINT "_societies_v_parent_id_societies_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."societies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_societies_v" ADD CONSTRAINT "_societies_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "societies_faculty_coordinators_order_idx" ON "societies_faculty_coordinators" USING btree ("_order");
  CREATE INDEX "societies_faculty_coordinators_parent_id_idx" ON "societies_faculty_coordinators" USING btree ("_parent_id");
  CREATE INDEX "societies_faculty_coordinators_faculty_idx" ON "societies_faculty_coordinators" USING btree ("faculty_id");
  CREATE INDEX "societies_student_leaders_order_idx" ON "societies_student_leaders" USING btree ("_order");
  CREATE INDEX "societies_student_leaders_parent_id_idx" ON "societies_student_leaders" USING btree ("_parent_id");
  CREATE INDEX "societies_contact_emails_order_idx" ON "societies_contact_emails" USING btree ("_order");
  CREATE INDEX "societies_contact_emails_parent_id_idx" ON "societies_contact_emails" USING btree ("_parent_id");
  CREATE INDEX "societies_links_order_idx" ON "societies_links" USING btree ("_order");
  CREATE INDEX "societies_links_parent_id_idx" ON "societies_links" USING btree ("_parent_id");
  CREATE INDEX "societies_gallery_order_idx" ON "societies_gallery" USING btree ("_order");
  CREATE INDEX "societies_gallery_parent_id_idx" ON "societies_gallery" USING btree ("_parent_id");
  CREATE INDEX "societies_gallery_image_idx" ON "societies_gallery" USING btree ("image_id");
  CREATE UNIQUE INDEX "societies_slug_idx" ON "societies" USING btree ("slug");
  CREATE INDEX "societies_logo_idx" ON "societies" USING btree ("logo_id");
  CREATE INDEX "societies_legacy_path_idx" ON "societies" USING btree ("legacy_path");
  CREATE INDEX "societies_updated_at_idx" ON "societies" USING btree ("updated_at");
  CREATE INDEX "societies_created_at_idx" ON "societies" USING btree ("created_at");
  CREATE INDEX "societies__status_idx" ON "societies" USING btree ("_status");
  CREATE INDEX "_societies_v_version_faculty_coordinators_order_idx" ON "_societies_v_version_faculty_coordinators" USING btree ("_order");
  CREATE INDEX "_societies_v_version_faculty_coordinators_parent_id_idx" ON "_societies_v_version_faculty_coordinators" USING btree ("_parent_id");
  CREATE INDEX "_societies_v_version_faculty_coordinators_faculty_idx" ON "_societies_v_version_faculty_coordinators" USING btree ("faculty_id");
  CREATE INDEX "_societies_v_version_student_leaders_order_idx" ON "_societies_v_version_student_leaders" USING btree ("_order");
  CREATE INDEX "_societies_v_version_student_leaders_parent_id_idx" ON "_societies_v_version_student_leaders" USING btree ("_parent_id");
  CREATE INDEX "_societies_v_version_contact_emails_order_idx" ON "_societies_v_version_contact_emails" USING btree ("_order");
  CREATE INDEX "_societies_v_version_contact_emails_parent_id_idx" ON "_societies_v_version_contact_emails" USING btree ("_parent_id");
  CREATE INDEX "_societies_v_version_links_order_idx" ON "_societies_v_version_links" USING btree ("_order");
  CREATE INDEX "_societies_v_version_links_parent_id_idx" ON "_societies_v_version_links" USING btree ("_parent_id");
  CREATE INDEX "_societies_v_version_gallery_order_idx" ON "_societies_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_societies_v_version_gallery_parent_id_idx" ON "_societies_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_societies_v_version_gallery_image_idx" ON "_societies_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_societies_v_parent_idx" ON "_societies_v" USING btree ("parent_id");
  CREATE INDEX "_societies_v_version_version_slug_idx" ON "_societies_v" USING btree ("version_slug");
  CREATE INDEX "_societies_v_version_version_logo_idx" ON "_societies_v" USING btree ("version_logo_id");
  CREATE INDEX "_societies_v_version_version_legacy_path_idx" ON "_societies_v" USING btree ("version_legacy_path");
  CREATE INDEX "_societies_v_version_version_updated_at_idx" ON "_societies_v" USING btree ("version_updated_at");
  CREATE INDEX "_societies_v_version_version_created_at_idx" ON "_societies_v" USING btree ("version_created_at");
  CREATE INDEX "_societies_v_version_version__status_idx" ON "_societies_v" USING btree ("version__status");
  CREATE INDEX "_societies_v_created_at_idx" ON "_societies_v" USING btree ("created_at");
  CREATE INDEX "_societies_v_updated_at_idx" ON "_societies_v" USING btree ("updated_at");
  CREATE INDEX "_societies_v_latest_idx" ON "_societies_v" USING btree ("latest");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_societies_fk" FOREIGN KEY ("societies_id") REFERENCES "public"."societies"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_societies_id_idx" ON "payload_locked_documents_rels" USING btree ("societies_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "societies_faculty_coordinators" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "societies_student_leaders" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "societies_contact_emails" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "societies_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "societies_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "societies" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_societies_v_version_faculty_coordinators" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_societies_v_version_student_leaders" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_societies_v_version_contact_emails" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_societies_v_version_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_societies_v_version_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_societies_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "societies_faculty_coordinators" CASCADE;
  DROP TABLE "societies_student_leaders" CASCADE;
  DROP TABLE "societies_contact_emails" CASCADE;
  DROP TABLE "societies_links" CASCADE;
  DROP TABLE "societies_gallery" CASCADE;
  DROP TABLE "societies" CASCADE;
  DROP TABLE "_societies_v_version_faculty_coordinators" CASCADE;
  DROP TABLE "_societies_v_version_student_leaders" CASCADE;
  DROP TABLE "_societies_v_version_contact_emails" CASCADE;
  DROP TABLE "_societies_v_version_links" CASCADE;
  DROP TABLE "_societies_v_version_gallery" CASCADE;
  DROP TABLE "_societies_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_societies_fk";
  
  DROP INDEX "payload_locked_documents_rels_societies_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "societies_id";
  DROP TYPE "public"."enum_societies_links_type";
  DROP TYPE "public"."enum_societies_category";
  DROP TYPE "public"."enum_societies_status";
  DROP TYPE "public"."enum__societies_v_version_links_type";
  DROP TYPE "public"."enum__societies_v_version_category";
  DROP TYPE "public"."enum__societies_v_version_status";`)
}
