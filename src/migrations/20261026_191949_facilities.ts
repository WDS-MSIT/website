import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_facilities_type" AS ENUM('laboratory', 'library', 'hostel', 'staff-accommodation', 'canteen', 'sports', 'medical', 'bank');
  CREATE TYPE "public"."enum_facilities_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__facilities_v_version_type" AS ENUM('laboratory', 'library', 'hostel', 'staff-accommodation', 'canteen', 'sports', 'medical', 'bank');
  CREATE TYPE "public"."enum__facilities_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "facilities_lab_descriptions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" jsonb
  );
  
  CREATE TABLE "facilities_lab_subjects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"code" varchar,
  	"class_semester" varchar
  );
  
  CREATE TABLE "facilities_lab_software" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "facilities_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "facilities_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "facilities" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"type" "enum_facilities_type",
  	"department_id" integer,
  	"description" jsonb,
  	"lab_equipment" jsonb,
  	"location" varchar,
  	"sort_order" numeric,
  	"source_url" varchar,
  	"source_snapshot_file" varchar,
  	"legacy_path" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_facilities_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_facilities_v_version_lab_descriptions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_facilities_v_version_lab_subjects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"code" varchar,
  	"class_semester" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_facilities_v_version_lab_software" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_facilities_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_facilities_v_version_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_facilities_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_type" "enum__facilities_v_version_type",
  	"version_department_id" integer,
  	"version_description" jsonb,
  	"version_lab_equipment" jsonb,
  	"version_location" varchar,
  	"version_sort_order" numeric,
  	"version_source_url" varchar,
  	"version_source_snapshot_file" varchar,
  	"version_legacy_path" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__facilities_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "facilities_id" integer;
  ALTER TABLE "facilities_lab_descriptions" ADD CONSTRAINT "facilities_lab_descriptions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."facilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "facilities_lab_subjects" ADD CONSTRAINT "facilities_lab_subjects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."facilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "facilities_lab_software" ADD CONSTRAINT "facilities_lab_software_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."facilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "facilities_gallery" ADD CONSTRAINT "facilities_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "facilities_gallery" ADD CONSTRAINT "facilities_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."facilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "facilities_links" ADD CONSTRAINT "facilities_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."facilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "facilities" ADD CONSTRAINT "facilities_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_facilities_v_version_lab_descriptions" ADD CONSTRAINT "_facilities_v_version_lab_descriptions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_facilities_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_facilities_v_version_lab_subjects" ADD CONSTRAINT "_facilities_v_version_lab_subjects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_facilities_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_facilities_v_version_lab_software" ADD CONSTRAINT "_facilities_v_version_lab_software_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_facilities_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_facilities_v_version_gallery" ADD CONSTRAINT "_facilities_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_facilities_v_version_gallery" ADD CONSTRAINT "_facilities_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_facilities_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_facilities_v_version_links" ADD CONSTRAINT "_facilities_v_version_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_facilities_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_facilities_v" ADD CONSTRAINT "_facilities_v_parent_id_facilities_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."facilities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_facilities_v" ADD CONSTRAINT "_facilities_v_version_department_id_departments_id_fk" FOREIGN KEY ("version_department_id") REFERENCES "public"."departments"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "facilities_lab_descriptions_order_idx" ON "facilities_lab_descriptions" USING btree ("_order");
  CREATE INDEX "facilities_lab_descriptions_parent_id_idx" ON "facilities_lab_descriptions" USING btree ("_parent_id");
  CREATE INDEX "facilities_lab_subjects_order_idx" ON "facilities_lab_subjects" USING btree ("_order");
  CREATE INDEX "facilities_lab_subjects_parent_id_idx" ON "facilities_lab_subjects" USING btree ("_parent_id");
  CREATE INDEX "facilities_lab_software_order_idx" ON "facilities_lab_software" USING btree ("_order");
  CREATE INDEX "facilities_lab_software_parent_id_idx" ON "facilities_lab_software" USING btree ("_parent_id");
  CREATE INDEX "facilities_gallery_order_idx" ON "facilities_gallery" USING btree ("_order");
  CREATE INDEX "facilities_gallery_parent_id_idx" ON "facilities_gallery" USING btree ("_parent_id");
  CREATE INDEX "facilities_gallery_image_idx" ON "facilities_gallery" USING btree ("image_id");
  CREATE INDEX "facilities_links_order_idx" ON "facilities_links" USING btree ("_order");
  CREATE INDEX "facilities_links_parent_id_idx" ON "facilities_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "facilities_slug_idx" ON "facilities" USING btree ("slug");
  CREATE INDEX "facilities_department_idx" ON "facilities" USING btree ("department_id");
  CREATE INDEX "facilities_legacy_path_idx" ON "facilities" USING btree ("legacy_path");
  CREATE INDEX "facilities_updated_at_idx" ON "facilities" USING btree ("updated_at");
  CREATE INDEX "facilities_created_at_idx" ON "facilities" USING btree ("created_at");
  CREATE INDEX "facilities__status_idx" ON "facilities" USING btree ("_status");
  CREATE INDEX "_facilities_v_version_lab_descriptions_order_idx" ON "_facilities_v_version_lab_descriptions" USING btree ("_order");
  CREATE INDEX "_facilities_v_version_lab_descriptions_parent_id_idx" ON "_facilities_v_version_lab_descriptions" USING btree ("_parent_id");
  CREATE INDEX "_facilities_v_version_lab_subjects_order_idx" ON "_facilities_v_version_lab_subjects" USING btree ("_order");
  CREATE INDEX "_facilities_v_version_lab_subjects_parent_id_idx" ON "_facilities_v_version_lab_subjects" USING btree ("_parent_id");
  CREATE INDEX "_facilities_v_version_lab_software_order_idx" ON "_facilities_v_version_lab_software" USING btree ("_order");
  CREATE INDEX "_facilities_v_version_lab_software_parent_id_idx" ON "_facilities_v_version_lab_software" USING btree ("_parent_id");
  CREATE INDEX "_facilities_v_version_gallery_order_idx" ON "_facilities_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_facilities_v_version_gallery_parent_id_idx" ON "_facilities_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_facilities_v_version_gallery_image_idx" ON "_facilities_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_facilities_v_version_links_order_idx" ON "_facilities_v_version_links" USING btree ("_order");
  CREATE INDEX "_facilities_v_version_links_parent_id_idx" ON "_facilities_v_version_links" USING btree ("_parent_id");
  CREATE INDEX "_facilities_v_parent_idx" ON "_facilities_v" USING btree ("parent_id");
  CREATE INDEX "_facilities_v_version_version_slug_idx" ON "_facilities_v" USING btree ("version_slug");
  CREATE INDEX "_facilities_v_version_version_department_idx" ON "_facilities_v" USING btree ("version_department_id");
  CREATE INDEX "_facilities_v_version_version_legacy_path_idx" ON "_facilities_v" USING btree ("version_legacy_path");
  CREATE INDEX "_facilities_v_version_version_updated_at_idx" ON "_facilities_v" USING btree ("version_updated_at");
  CREATE INDEX "_facilities_v_version_version_created_at_idx" ON "_facilities_v" USING btree ("version_created_at");
  CREATE INDEX "_facilities_v_version_version__status_idx" ON "_facilities_v" USING btree ("version__status");
  CREATE INDEX "_facilities_v_created_at_idx" ON "_facilities_v" USING btree ("created_at");
  CREATE INDEX "_facilities_v_updated_at_idx" ON "_facilities_v" USING btree ("updated_at");
  CREATE INDEX "_facilities_v_latest_idx" ON "_facilities_v" USING btree ("latest");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_facilities_fk" FOREIGN KEY ("facilities_id") REFERENCES "public"."facilities"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_facilities_id_idx" ON "payload_locked_documents_rels" USING btree ("facilities_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "facilities_lab_descriptions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "facilities_lab_subjects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "facilities_lab_software" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "facilities_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "facilities_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "facilities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_facilities_v_version_lab_descriptions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_facilities_v_version_lab_subjects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_facilities_v_version_lab_software" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_facilities_v_version_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_facilities_v_version_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_facilities_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "facilities_lab_descriptions" CASCADE;
  DROP TABLE "facilities_lab_subjects" CASCADE;
  DROP TABLE "facilities_lab_software" CASCADE;
  DROP TABLE "facilities_gallery" CASCADE;
  DROP TABLE "facilities_links" CASCADE;
  DROP TABLE "facilities" CASCADE;
  DROP TABLE "_facilities_v_version_lab_descriptions" CASCADE;
  DROP TABLE "_facilities_v_version_lab_subjects" CASCADE;
  DROP TABLE "_facilities_v_version_lab_software" CASCADE;
  DROP TABLE "_facilities_v_version_gallery" CASCADE;
  DROP TABLE "_facilities_v_version_links" CASCADE;
  DROP TABLE "_facilities_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_facilities_fk";
  
  DROP INDEX "payload_locked_documents_rels_facilities_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "facilities_id";
  DROP TYPE "public"."enum_facilities_type";
  DROP TYPE "public"."enum_facilities_status";
  DROP TYPE "public"."enum__facilities_v_version_type";
  DROP TYPE "public"."enum__facilities_v_version_status";`)
}
