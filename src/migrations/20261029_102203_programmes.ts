import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_programmes_intakes_shift" AS ENUM('unspecified', 'first', 'second', 'combined');
  CREATE TYPE "public"."enum_programmes_legacy_resources_type" AS ENUM('programme-outcomes', 'scheme', 'syllabus', 'lesson-plan', 'outcome-mapping', 'assignments', 'notes', 'question-papers', 'question-bank', 'other');
  CREATE TYPE "public"."enum_programmes_accreditations_accreditation_status" AS ENUM('claimed', 'accredited', 'expired', 'not-accredited');
  CREATE TYPE "public"."enum_programmes_level" AS ENUM('undergraduate', 'postgraduate', 'doctoral');
  CREATE TYPE "public"."enum_programmes_review_status" AS ENUM('unreviewed', 'needs-confirmation', 'verified', 'rejected');
  CREATE TYPE "public"."enum_programmes_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__programmes_v_version_intakes_shift" AS ENUM('unspecified', 'first', 'second', 'combined');
  CREATE TYPE "public"."enum__programmes_v_version_legacy_resources_type" AS ENUM('programme-outcomes', 'scheme', 'syllabus', 'lesson-plan', 'outcome-mapping', 'assignments', 'notes', 'question-papers', 'question-bank', 'other');
  CREATE TYPE "public"."enum__programmes_v_version_accreditations_accreditation_status" AS ENUM('claimed', 'accredited', 'expired', 'not-accredited');
  CREATE TYPE "public"."enum__programmes_v_version_level" AS ENUM('undergraduate', 'postgraduate', 'doctoral');
  CREATE TYPE "public"."enum__programmes_v_version_review_status" AS ENUM('unreviewed', 'needs-confirmation', 'verified', 'rejected');
  CREATE TYPE "public"."enum__programmes_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "programmes_intakes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"academic_year" varchar,
  	"shift" "enum_programmes_intakes_shift" DEFAULT 'unspecified',
  	"seats" numeric,
  	"source_note" varchar
  );
  
  CREATE TABLE "programmes_educational_objectives" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"statement" varchar
  );
  
  CREATE TABLE "programmes_programme_outcomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"title" varchar,
  	"statement" varchar
  );
  
  CREATE TABLE "programmes_programme_specific_outcomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"statement" varchar
  );
  
  CREATE TABLE "programmes_legacy_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"type" "enum_programmes_legacy_resources_type" DEFAULT 'other'
  );
  
  CREATE TABLE "links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "programmes_accreditations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"accrediting_body" varchar,
  	"accreditation_status" "enum_programmes_accreditations_accreditation_status" DEFAULT 'claimed',
  	"valid_from" timestamp(3) with time zone,
  	"valid_until" timestamp(3) with time zone,
  	"note" varchar
  );
  
  CREATE TABLE "programmes_source_references" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"snapshot_file" varchar
  );
  
  CREATE TABLE "programmes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"short_name" varchar,
  	"code" varchar,
  	"slug" varchar,
  	"degree" varchar,
  	"level" "enum_programmes_level",
  	"department_id" integer,
  	"duration_years" numeric,
  	"description" jsonb,
  	"review_status" "enum_programmes_review_status" DEFAULT 'unreviewed',
  	"legacy_path" varchar,
  	"source_url" varchar,
  	"source_snapshot_file" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_programmes_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "programmes_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"documents_id" integer
  );
  
  CREATE TABLE "_programmes_v_version_intakes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"academic_year" varchar,
  	"shift" "enum__programmes_v_version_intakes_shift" DEFAULT 'unspecified',
  	"seats" numeric,
  	"source_note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programmes_v_version_educational_objectives" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"statement" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programmes_v_version_programme_outcomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"title" varchar,
  	"statement" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programmes_v_version_programme_specific_outcomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"statement" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programmes_v_version_legacy_resources" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"type" "enum__programmes_v_version_legacy_resources_type" DEFAULT 'other',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_links_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programmes_v_version_accreditations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"accrediting_body" varchar,
  	"accreditation_status" "enum__programmes_v_version_accreditations_accreditation_status" DEFAULT 'claimed',
  	"valid_from" timestamp(3) with time zone,
  	"valid_until" timestamp(3) with time zone,
  	"note" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programmes_v_version_source_references" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"snapshot_file" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_programmes_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_short_name" varchar,
  	"version_code" varchar,
  	"version_slug" varchar,
  	"version_degree" varchar,
  	"version_level" "enum__programmes_v_version_level",
  	"version_department_id" integer,
  	"version_duration_years" numeric,
  	"version_description" jsonb,
  	"version_review_status" "enum__programmes_v_version_review_status" DEFAULT 'unreviewed',
  	"version_legacy_path" varchar,
  	"version_source_url" varchar,
  	"version_source_snapshot_file" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__programmes_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_programmes_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"documents_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "programmes_id" integer;
  ALTER TABLE "programmes_intakes" ADD CONSTRAINT "programmes_intakes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes_educational_objectives" ADD CONSTRAINT "programmes_educational_objectives_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes_programme_outcomes" ADD CONSTRAINT "programmes_programme_outcomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes_programme_specific_outcomes" ADD CONSTRAINT "programmes_programme_specific_outcomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes_legacy_resources" ADD CONSTRAINT "programmes_legacy_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "links" ADD CONSTRAINT "links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programmes_accreditations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes_accreditations" ADD CONSTRAINT "programmes_accreditations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes_source_references" ADD CONSTRAINT "programmes_source_references_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes" ADD CONSTRAINT "programmes_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programmes_rels" ADD CONSTRAINT "programmes_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes_rels" ADD CONSTRAINT "programmes_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programmes_v_version_intakes" ADD CONSTRAINT "_programmes_v_version_intakes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programmes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programmes_v_version_educational_objectives" ADD CONSTRAINT "_programmes_v_version_educational_objectives_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programmes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programmes_v_version_programme_outcomes" ADD CONSTRAINT "_programmes_v_version_programme_outcomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programmes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programmes_v_version_programme_specific_outcomes" ADD CONSTRAINT "_programmes_v_version_programme_specific_outcomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programmes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programmes_v_version_legacy_resources" ADD CONSTRAINT "_programmes_v_version_legacy_resources_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programmes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_links_v" ADD CONSTRAINT "_links_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programmes_v_version_accreditations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programmes_v_version_accreditations" ADD CONSTRAINT "_programmes_v_version_accreditations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programmes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programmes_v_version_source_references" ADD CONSTRAINT "_programmes_v_version_source_references_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_programmes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programmes_v" ADD CONSTRAINT "_programmes_v_parent_id_programmes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."programmes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programmes_v" ADD CONSTRAINT "_programmes_v_version_department_id_departments_id_fk" FOREIGN KEY ("version_department_id") REFERENCES "public"."departments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_programmes_v_rels" ADD CONSTRAINT "_programmes_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_programmes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_programmes_v_rels" ADD CONSTRAINT "_programmes_v_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "programmes_intakes_order_idx" ON "programmes_intakes" USING btree ("_order");
  CREATE INDEX "programmes_intakes_parent_id_idx" ON "programmes_intakes" USING btree ("_parent_id");
  CREATE INDEX "programmes_educational_objectives_order_idx" ON "programmes_educational_objectives" USING btree ("_order");
  CREATE INDEX "programmes_educational_objectives_parent_id_idx" ON "programmes_educational_objectives" USING btree ("_parent_id");
  CREATE INDEX "programmes_programme_outcomes_order_idx" ON "programmes_programme_outcomes" USING btree ("_order");
  CREATE INDEX "programmes_programme_outcomes_parent_id_idx" ON "programmes_programme_outcomes" USING btree ("_parent_id");
  CREATE INDEX "programmes_programme_specific_outcomes_order_idx" ON "programmes_programme_specific_outcomes" USING btree ("_order");
  CREATE INDEX "programmes_programme_specific_outcomes_parent_id_idx" ON "programmes_programme_specific_outcomes" USING btree ("_parent_id");
  CREATE INDEX "programmes_legacy_resources_order_idx" ON "programmes_legacy_resources" USING btree ("_order");
  CREATE INDEX "programmes_legacy_resources_parent_id_idx" ON "programmes_legacy_resources" USING btree ("_parent_id");
  CREATE INDEX "links_order_idx" ON "links" USING btree ("_order");
  CREATE INDEX "links_parent_id_idx" ON "links" USING btree ("_parent_id");
  CREATE INDEX "programmes_accreditations_order_idx" ON "programmes_accreditations" USING btree ("_order");
  CREATE INDEX "programmes_accreditations_parent_id_idx" ON "programmes_accreditations" USING btree ("_parent_id");
  CREATE INDEX "programmes_source_references_order_idx" ON "programmes_source_references" USING btree ("_order");
  CREATE INDEX "programmes_source_references_parent_id_idx" ON "programmes_source_references" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "programmes_code_idx" ON "programmes" USING btree ("code");
  CREATE UNIQUE INDEX "programmes_slug_idx" ON "programmes" USING btree ("slug");
  CREATE INDEX "programmes_department_idx" ON "programmes" USING btree ("department_id");
  CREATE INDEX "programmes_legacy_path_idx" ON "programmes" USING btree ("legacy_path");
  CREATE INDEX "programmes_updated_at_idx" ON "programmes" USING btree ("updated_at");
  CREATE INDEX "programmes_created_at_idx" ON "programmes" USING btree ("created_at");
  CREATE INDEX "programmes__status_idx" ON "programmes" USING btree ("_status");
  CREATE INDEX "programmes_rels_order_idx" ON "programmes_rels" USING btree ("order");
  CREATE INDEX "programmes_rels_parent_idx" ON "programmes_rels" USING btree ("parent_id");
  CREATE INDEX "programmes_rels_path_idx" ON "programmes_rels" USING btree ("path");
  CREATE INDEX "programmes_rels_documents_id_idx" ON "programmes_rels" USING btree ("documents_id");
  CREATE INDEX "_programmes_v_version_intakes_order_idx" ON "_programmes_v_version_intakes" USING btree ("_order");
  CREATE INDEX "_programmes_v_version_intakes_parent_id_idx" ON "_programmes_v_version_intakes" USING btree ("_parent_id");
  CREATE INDEX "_programmes_v_version_educational_objectives_order_idx" ON "_programmes_v_version_educational_objectives" USING btree ("_order");
  CREATE INDEX "_programmes_v_version_educational_objectives_parent_id_idx" ON "_programmes_v_version_educational_objectives" USING btree ("_parent_id");
  CREATE INDEX "_programmes_v_version_programme_outcomes_order_idx" ON "_programmes_v_version_programme_outcomes" USING btree ("_order");
  CREATE INDEX "_programmes_v_version_programme_outcomes_parent_id_idx" ON "_programmes_v_version_programme_outcomes" USING btree ("_parent_id");
  CREATE INDEX "_programmes_v_version_programme_specific_outcomes_order_idx" ON "_programmes_v_version_programme_specific_outcomes" USING btree ("_order");
  CREATE INDEX "_programmes_v_version_programme_specific_outcomes_parent_id_idx" ON "_programmes_v_version_programme_specific_outcomes" USING btree ("_parent_id");
  CREATE INDEX "_programmes_v_version_legacy_resources_order_idx" ON "_programmes_v_version_legacy_resources" USING btree ("_order");
  CREATE INDEX "_programmes_v_version_legacy_resources_parent_id_idx" ON "_programmes_v_version_legacy_resources" USING btree ("_parent_id");
  CREATE INDEX "_links_v_order_idx" ON "_links_v" USING btree ("_order");
  CREATE INDEX "_links_v_parent_id_idx" ON "_links_v" USING btree ("_parent_id");
  CREATE INDEX "_programmes_v_version_accreditations_order_idx" ON "_programmes_v_version_accreditations" USING btree ("_order");
  CREATE INDEX "_programmes_v_version_accreditations_parent_id_idx" ON "_programmes_v_version_accreditations" USING btree ("_parent_id");
  CREATE INDEX "_programmes_v_version_source_references_order_idx" ON "_programmes_v_version_source_references" USING btree ("_order");
  CREATE INDEX "_programmes_v_version_source_references_parent_id_idx" ON "_programmes_v_version_source_references" USING btree ("_parent_id");
  CREATE INDEX "_programmes_v_parent_idx" ON "_programmes_v" USING btree ("parent_id");
  CREATE INDEX "_programmes_v_version_version_code_idx" ON "_programmes_v" USING btree ("version_code");
  CREATE INDEX "_programmes_v_version_version_slug_idx" ON "_programmes_v" USING btree ("version_slug");
  CREATE INDEX "_programmes_v_version_version_department_idx" ON "_programmes_v" USING btree ("version_department_id");
  CREATE INDEX "_programmes_v_version_version_legacy_path_idx" ON "_programmes_v" USING btree ("version_legacy_path");
  CREATE INDEX "_programmes_v_version_version_updated_at_idx" ON "_programmes_v" USING btree ("version_updated_at");
  CREATE INDEX "_programmes_v_version_version_created_at_idx" ON "_programmes_v" USING btree ("version_created_at");
  CREATE INDEX "_programmes_v_version_version__status_idx" ON "_programmes_v" USING btree ("version__status");
  CREATE INDEX "_programmes_v_created_at_idx" ON "_programmes_v" USING btree ("created_at");
  CREATE INDEX "_programmes_v_updated_at_idx" ON "_programmes_v" USING btree ("updated_at");
  CREATE INDEX "_programmes_v_latest_idx" ON "_programmes_v" USING btree ("latest");
  CREATE INDEX "_programmes_v_rels_order_idx" ON "_programmes_v_rels" USING btree ("order");
  CREATE INDEX "_programmes_v_rels_parent_idx" ON "_programmes_v_rels" USING btree ("parent_id");
  CREATE INDEX "_programmes_v_rels_path_idx" ON "_programmes_v_rels" USING btree ("path");
  CREATE INDEX "_programmes_v_rels_documents_id_idx" ON "_programmes_v_rels" USING btree ("documents_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_programmes_fk" FOREIGN KEY ("programmes_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_programmes_id_idx" ON "payload_locked_documents_rels" USING btree ("programmes_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "programmes_intakes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programmes_educational_objectives" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programmes_programme_outcomes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programmes_programme_specific_outcomes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programmes_legacy_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programmes_accreditations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programmes_source_references" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programmes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "programmes_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_programmes_v_version_intakes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_programmes_v_version_educational_objectives" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_programmes_v_version_programme_outcomes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_programmes_v_version_programme_specific_outcomes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_programmes_v_version_legacy_resources" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_links_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_programmes_v_version_accreditations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_programmes_v_version_source_references" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_programmes_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_programmes_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "programmes_intakes" CASCADE;
  DROP TABLE "programmes_educational_objectives" CASCADE;
  DROP TABLE "programmes_programme_outcomes" CASCADE;
  DROP TABLE "programmes_programme_specific_outcomes" CASCADE;
  DROP TABLE "programmes_legacy_resources" CASCADE;
  DROP TABLE "links" CASCADE;
  DROP TABLE "programmes_accreditations" CASCADE;
  DROP TABLE "programmes_source_references" CASCADE;
  DROP TABLE "programmes" CASCADE;
  DROP TABLE "programmes_rels" CASCADE;
  DROP TABLE "_programmes_v_version_intakes" CASCADE;
  DROP TABLE "_programmes_v_version_educational_objectives" CASCADE;
  DROP TABLE "_programmes_v_version_programme_outcomes" CASCADE;
  DROP TABLE "_programmes_v_version_programme_specific_outcomes" CASCADE;
  DROP TABLE "_programmes_v_version_legacy_resources" CASCADE;
  DROP TABLE "_links_v" CASCADE;
  DROP TABLE "_programmes_v_version_accreditations" CASCADE;
  DROP TABLE "_programmes_v_version_source_references" CASCADE;
  DROP TABLE "_programmes_v" CASCADE;
  DROP TABLE "_programmes_v_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_programmes_fk";
  
  DROP INDEX "payload_locked_documents_rels_programmes_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "programmes_id";
  DROP TYPE "public"."enum_programmes_intakes_shift";
  DROP TYPE "public"."enum_programmes_legacy_resources_type";
  DROP TYPE "public"."enum_programmes_accreditations_accreditation_status";
  DROP TYPE "public"."enum_programmes_level";
  DROP TYPE "public"."enum_programmes_review_status";
  DROP TYPE "public"."enum_programmes_status";
  DROP TYPE "public"."enum__programmes_v_version_intakes_shift";
  DROP TYPE "public"."enum__programmes_v_version_legacy_resources_type";
  DROP TYPE "public"."enum__programmes_v_version_accreditations_accreditation_status";
  DROP TYPE "public"."enum__programmes_v_version_level";
  DROP TYPE "public"."enum__programmes_v_version_review_status";
  DROP TYPE "public"."enum__programmes_v_version_status";`)
}
