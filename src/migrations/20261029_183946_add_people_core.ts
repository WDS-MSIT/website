import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_people_person_types" AS ENUM('faculty', 'leadership', 'administration', 'technical-staff', 'library-staff', 'placement-staff', 'governance', 'committee-member', 'society-member', 'student', 'external');
  CREATE TYPE "public"."enum_people_roles_type" AS ENUM('faculty', 'leadership', 'administration', 'technical-staff', 'library-staff', 'placement-staff', 'governance', 'committee-member', 'society-member', 'student', 'external');
  CREATE TYPE "public"."enum_people_review_status" AS ENUM('unreviewed', 'needs-confirmation', 'verified', 'rejected');
  CREATE TYPE "public"."enum_people_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__people_v_version_person_types" AS ENUM('faculty', 'leadership', 'administration', 'technical-staff', 'library-staff', 'placement-staff', 'governance', 'committee-member', 'society-member', 'student', 'external');
  CREATE TYPE "public"."enum__people_v_version_roles_type" AS ENUM('faculty', 'leadership', 'administration', 'technical-staff', 'library-staff', 'placement-staff', 'governance', 'committee-member', 'society-member', 'student', 'external');
  CREATE TYPE "public"."enum__people_v_version_review_status" AS ENUM('unreviewed', 'needs-confirmation', 'verified', 'rejected');
  CREATE TYPE "public"."enum__people_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "people_person_types" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_people_person_types",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "people_roles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_people_roles_type",
  	"title" varchar,
  	"context" varchar,
  	"department_id" integer,
  	"source_url" varchar
  );
  
  CREATE TABLE "people_qualifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"qualification" varchar
  );
  
  CREATE TABLE "people_source_references" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"snapshot_file" varchar
  );
  
  CREATE TABLE "people" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"primary_designation" varchar,
  	"sort_order" numeric,
  	"email" varchar,
  	"phone" varchar,
  	"biography" varchar,
  	"photo_id" integer,
  	"legacy_photo_url" varchar,
  	"detailed_profile_id" integer,
  	"legacy_profile_url" varchar,
  	"vidwan_id" varchar,
  	"review_status" "enum_people_review_status" DEFAULT 'unreviewed',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_people_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "people_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"departments_id" integer
  );
  
  CREATE TABLE "_people_v_version_person_types" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__people_v_version_person_types",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_people_v_version_roles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__people_v_version_roles_type",
  	"title" varchar,
  	"context" varchar,
  	"department_id" integer,
  	"source_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_people_v_version_qualifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"qualification" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_people_v_version_source_references" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"snapshot_file" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_people_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_primary_designation" varchar,
  	"version_sort_order" numeric,
  	"version_email" varchar,
  	"version_phone" varchar,
  	"version_biography" varchar,
  	"version_photo_id" integer,
  	"version_legacy_photo_url" varchar,
  	"version_detailed_profile_id" integer,
  	"version_legacy_profile_url" varchar,
  	"version_vidwan_id" varchar,
  	"version_review_status" "enum__people_v_version_review_status" DEFAULT 'unreviewed',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__people_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_people_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"departments_id" integer
  );
  
  ALTER TABLE "media" ADD COLUMN "_objectkey" varchar;
  ALTER TABLE "documents" ADD COLUMN "_objectkey" varchar;
  ALTER TABLE "_documents_v" ADD COLUMN "version__objectkey" varchar;
  ALTER TABLE "people_person_types" ADD CONSTRAINT "people_person_types_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_roles" ADD CONSTRAINT "people_roles_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_roles" ADD CONSTRAINT "people_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_qualifications" ADD CONSTRAINT "people_qualifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_source_references" ADD CONSTRAINT "people_source_references_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people" ADD CONSTRAINT "people_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people" ADD CONSTRAINT "people_detailed_profile_id_documents_id_fk" FOREIGN KEY ("detailed_profile_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_rels" ADD CONSTRAINT "people_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_rels" ADD CONSTRAINT "people_rels_departments_fk" FOREIGN KEY ("departments_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_version_person_types" ADD CONSTRAINT "_people_v_version_person_types_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_version_roles" ADD CONSTRAINT "_people_v_version_roles_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_version_roles" ADD CONSTRAINT "_people_v_version_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_version_qualifications" ADD CONSTRAINT "_people_v_version_qualifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_version_source_references" ADD CONSTRAINT "_people_v_version_source_references_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v" ADD CONSTRAINT "_people_v_parent_id_people_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v" ADD CONSTRAINT "_people_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v" ADD CONSTRAINT "_people_v_version_detailed_profile_id_documents_id_fk" FOREIGN KEY ("version_detailed_profile_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_rels" ADD CONSTRAINT "_people_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_rels" ADD CONSTRAINT "_people_v_rels_departments_fk" FOREIGN KEY ("departments_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "people_person_types_order_idx" ON "people_person_types" USING btree ("order");
  CREATE INDEX "people_person_types_parent_idx" ON "people_person_types" USING btree ("parent_id");
  CREATE INDEX "people_roles_order_idx" ON "people_roles" USING btree ("_order");
  CREATE INDEX "people_roles_parent_id_idx" ON "people_roles" USING btree ("_parent_id");
  CREATE INDEX "people_roles_department_idx" ON "people_roles" USING btree ("department_id");
  CREATE INDEX "people_qualifications_order_idx" ON "people_qualifications" USING btree ("_order");
  CREATE INDEX "people_qualifications_parent_id_idx" ON "people_qualifications" USING btree ("_parent_id");
  CREATE INDEX "people_source_references_order_idx" ON "people_source_references" USING btree ("_order");
  CREATE INDEX "people_source_references_parent_id_idx" ON "people_source_references" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "people_slug_idx" ON "people" USING btree ("slug");
  CREATE INDEX "people_photo_idx" ON "people" USING btree ("photo_id");
  CREATE INDEX "people_detailed_profile_idx" ON "people" USING btree ("detailed_profile_id");
  CREATE UNIQUE INDEX "people_vidwan_id_idx" ON "people" USING btree ("vidwan_id");
  CREATE INDEX "people_updated_at_idx" ON "people" USING btree ("updated_at");
  CREATE INDEX "people_created_at_idx" ON "people" USING btree ("created_at");
  CREATE INDEX "people__status_idx" ON "people" USING btree ("_status");
  CREATE INDEX "people_rels_order_idx" ON "people_rels" USING btree ("order");
  CREATE INDEX "people_rels_parent_idx" ON "people_rels" USING btree ("parent_id");
  CREATE INDEX "people_rels_path_idx" ON "people_rels" USING btree ("path");
  CREATE INDEX "people_rels_departments_id_idx" ON "people_rels" USING btree ("departments_id");
  CREATE INDEX "_people_v_version_person_types_order_idx" ON "_people_v_version_person_types" USING btree ("order");
  CREATE INDEX "_people_v_version_person_types_parent_idx" ON "_people_v_version_person_types" USING btree ("parent_id");
  CREATE INDEX "_people_v_version_roles_order_idx" ON "_people_v_version_roles" USING btree ("_order");
  CREATE INDEX "_people_v_version_roles_parent_id_idx" ON "_people_v_version_roles" USING btree ("_parent_id");
  CREATE INDEX "_people_v_version_roles_department_idx" ON "_people_v_version_roles" USING btree ("department_id");
  CREATE INDEX "_people_v_version_qualifications_order_idx" ON "_people_v_version_qualifications" USING btree ("_order");
  CREATE INDEX "_people_v_version_qualifications_parent_id_idx" ON "_people_v_version_qualifications" USING btree ("_parent_id");
  CREATE INDEX "_people_v_version_source_references_order_idx" ON "_people_v_version_source_references" USING btree ("_order");
  CREATE INDEX "_people_v_version_source_references_parent_id_idx" ON "_people_v_version_source_references" USING btree ("_parent_id");
  CREATE INDEX "_people_v_parent_idx" ON "_people_v" USING btree ("parent_id");
  CREATE INDEX "_people_v_version_version_slug_idx" ON "_people_v" USING btree ("version_slug");
  CREATE INDEX "_people_v_version_version_photo_idx" ON "_people_v" USING btree ("version_photo_id");
  CREATE INDEX "_people_v_version_version_detailed_profile_idx" ON "_people_v" USING btree ("version_detailed_profile_id");
  CREATE INDEX "_people_v_version_version_vidwan_id_idx" ON "_people_v" USING btree ("version_vidwan_id");
  CREATE INDEX "_people_v_version_version_updated_at_idx" ON "_people_v" USING btree ("version_updated_at");
  CREATE INDEX "_people_v_version_version_created_at_idx" ON "_people_v" USING btree ("version_created_at");
  CREATE INDEX "_people_v_version_version__status_idx" ON "_people_v" USING btree ("version__status");
  CREATE INDEX "_people_v_created_at_idx" ON "_people_v" USING btree ("created_at");
  CREATE INDEX "_people_v_updated_at_idx" ON "_people_v" USING btree ("updated_at");
  CREATE INDEX "_people_v_latest_idx" ON "_people_v" USING btree ("latest");
  CREATE INDEX "_people_v_rels_order_idx" ON "_people_v_rels" USING btree ("order");
  CREATE INDEX "_people_v_rels_parent_idx" ON "_people_v_rels" USING btree ("parent_id");
  CREATE INDEX "_people_v_rels_path_idx" ON "_people_v_rels" USING btree ("path");
  CREATE INDEX "_people_v_rels_departments_id_idx" ON "_people_v_rels" USING btree ("departments_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "people_person_types" CASCADE;
  DROP TABLE "people_roles" CASCADE;
  DROP TABLE "people_qualifications" CASCADE;
  DROP TABLE "people_source_references" CASCADE;
  DROP TABLE "people" CASCADE;
  DROP TABLE "people_rels" CASCADE;
  DROP TABLE "_people_v_version_person_types" CASCADE;
  DROP TABLE "_people_v_version_roles" CASCADE;
  DROP TABLE "_people_v_version_qualifications" CASCADE;
  DROP TABLE "_people_v_version_source_references" CASCADE;
  DROP TABLE "_people_v" CASCADE;
  DROP TABLE "_people_v_rels" CASCADE;
  ALTER TABLE "media" DROP COLUMN "_objectkey";
  ALTER TABLE "documents" DROP COLUMN "_objectkey";
  ALTER TABLE "_documents_v" DROP COLUMN "version__objectkey";
  DROP TYPE "public"."enum_people_person_types";
  DROP TYPE "public"."enum_people_roles_type";
  DROP TYPE "public"."enum_people_review_status";
  DROP TYPE "public"."enum_people_status";
  DROP TYPE "public"."enum__people_v_version_person_types";
  DROP TYPE "public"."enum__people_v_version_roles_type";
  DROP TYPE "public"."enum__people_v_version_review_status";
  DROP TYPE "public"."enum__people_v_version_status";`)
}
