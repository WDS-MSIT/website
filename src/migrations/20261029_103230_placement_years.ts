import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_placement_years_placement_status" AS ENUM('final', 'ongoing');
  CREATE TYPE "public"."enum_placement_years_review_status" AS ENUM('unreviewed', 'needs-confirmation', 'verified', 'rejected');
  CREATE TYPE "public"."enum_placement_years_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__placement_years_v_version_placement_status" AS ENUM('final', 'ongoing');
  CREATE TYPE "public"."enum__placement_years_v_version_review_status" AS ENUM('unreviewed', 'needs-confirmation', 'verified', 'rejected');
  CREATE TYPE "public"."enum__placement_years_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "placement_years_legacy_evidence" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "placement_years" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"year" numeric,
  	"placement_status" "enum_placement_years_placement_status" DEFAULT 'final',
  	"statistics_as_of" timestamp(3) with time zone,
  	"narrative_notes" varchar,
  	"offer_count" numeric,
  	"highest_package_lpa" numeric,
  	"median_package_lpa" numeric,
  	"average_package_lpa" numeric,
  	"statistics_note" varchar,
  	"review_status" "enum_placement_years_review_status" DEFAULT 'unreviewed',
  	"reviewed_at" timestamp(3) with time zone,
  	"source_url" varchar,
  	"source_snapshot_file" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_placement_years_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "placement_years_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"documents_id" integer
  );
  
  CREATE TABLE "_placement_years_v_version_legacy_evidence" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_placement_years_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_year" numeric,
  	"version_placement_status" "enum__placement_years_v_version_placement_status" DEFAULT 'final',
  	"version_statistics_as_of" timestamp(3) with time zone,
  	"version_narrative_notes" varchar,
  	"version_offer_count" numeric,
  	"version_highest_package_lpa" numeric,
  	"version_median_package_lpa" numeric,
  	"version_average_package_lpa" numeric,
  	"version_statistics_note" varchar,
  	"version_review_status" "enum__placement_years_v_version_review_status" DEFAULT 'unreviewed',
  	"version_reviewed_at" timestamp(3) with time zone,
  	"version_source_url" varchar,
  	"version_source_snapshot_file" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__placement_years_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_placement_years_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"documents_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "placement_years_id" integer;
  ALTER TABLE "placement_years_legacy_evidence" ADD CONSTRAINT "placement_years_legacy_evidence_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."placement_years"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "placement_years_rels" ADD CONSTRAINT "placement_years_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."placement_years"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "placement_years_rels" ADD CONSTRAINT "placement_years_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_placement_years_v_version_legacy_evidence" ADD CONSTRAINT "_placement_years_v_version_legacy_evidence_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_placement_years_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_placement_years_v" ADD CONSTRAINT "_placement_years_v_parent_id_placement_years_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."placement_years"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_placement_years_v_rels" ADD CONSTRAINT "_placement_years_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_placement_years_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_placement_years_v_rels" ADD CONSTRAINT "_placement_years_v_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "placement_years_legacy_evidence_order_idx" ON "placement_years_legacy_evidence" USING btree ("_order");
  CREATE INDEX "placement_years_legacy_evidence_parent_id_idx" ON "placement_years_legacy_evidence" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "placement_years_year_idx" ON "placement_years" USING btree ("year");
  CREATE INDEX "placement_years_updated_at_idx" ON "placement_years" USING btree ("updated_at");
  CREATE INDEX "placement_years_created_at_idx" ON "placement_years" USING btree ("created_at");
  CREATE INDEX "placement_years__status_idx" ON "placement_years" USING btree ("_status");
  CREATE INDEX "placement_years_rels_order_idx" ON "placement_years_rels" USING btree ("order");
  CREATE INDEX "placement_years_rels_parent_idx" ON "placement_years_rels" USING btree ("parent_id");
  CREATE INDEX "placement_years_rels_path_idx" ON "placement_years_rels" USING btree ("path");
  CREATE INDEX "placement_years_rels_documents_id_idx" ON "placement_years_rels" USING btree ("documents_id");
  CREATE INDEX "_placement_years_v_version_legacy_evidence_order_idx" ON "_placement_years_v_version_legacy_evidence" USING btree ("_order");
  CREATE INDEX "_placement_years_v_version_legacy_evidence_parent_id_idx" ON "_placement_years_v_version_legacy_evidence" USING btree ("_parent_id");
  CREATE INDEX "_placement_years_v_parent_idx" ON "_placement_years_v" USING btree ("parent_id");
  CREATE INDEX "_placement_years_v_version_version_year_idx" ON "_placement_years_v" USING btree ("version_year");
  CREATE INDEX "_placement_years_v_version_version_updated_at_idx" ON "_placement_years_v" USING btree ("version_updated_at");
  CREATE INDEX "_placement_years_v_version_version_created_at_idx" ON "_placement_years_v" USING btree ("version_created_at");
  CREATE INDEX "_placement_years_v_version_version__status_idx" ON "_placement_years_v" USING btree ("version__status");
  CREATE INDEX "_placement_years_v_created_at_idx" ON "_placement_years_v" USING btree ("created_at");
  CREATE INDEX "_placement_years_v_updated_at_idx" ON "_placement_years_v" USING btree ("updated_at");
  CREATE INDEX "_placement_years_v_latest_idx" ON "_placement_years_v" USING btree ("latest");
  CREATE INDEX "_placement_years_v_rels_order_idx" ON "_placement_years_v_rels" USING btree ("order");
  CREATE INDEX "_placement_years_v_rels_parent_idx" ON "_placement_years_v_rels" USING btree ("parent_id");
  CREATE INDEX "_placement_years_v_rels_path_idx" ON "_placement_years_v_rels" USING btree ("path");
  CREATE INDEX "_placement_years_v_rels_documents_id_idx" ON "_placement_years_v_rels" USING btree ("documents_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_placement_years_fk" FOREIGN KEY ("placement_years_id") REFERENCES "public"."placement_years"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_placement_years_id_idx" ON "payload_locked_documents_rels" USING btree ("placement_years_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "placement_years_legacy_evidence" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "placement_years" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "placement_years_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_placement_years_v_version_legacy_evidence" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_placement_years_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_placement_years_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "placement_years_legacy_evidence" CASCADE;
  DROP TABLE "placement_years" CASCADE;
  DROP TABLE "placement_years_rels" CASCADE;
  DROP TABLE "_placement_years_v_version_legacy_evidence" CASCADE;
  DROP TABLE "_placement_years_v" CASCADE;
  DROP TABLE "_placement_years_v_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_placement_years_fk";
  
  DROP INDEX "payload_locked_documents_rels_placement_years_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "placement_years_id";
  DROP TYPE "public"."enum_placement_years_placement_status";
  DROP TYPE "public"."enum_placement_years_review_status";
  DROP TYPE "public"."enum_placement_years_status";
  DROP TYPE "public"."enum__placement_years_v_version_placement_status";
  DROP TYPE "public"."enum__placement_years_v_version_review_status";
  DROP TYPE "public"."enum__placement_years_v_version_status";`)
}
