import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_documents_review_status" AS ENUM('unreviewed', 'needs-confirmation', 'verified', 'rejected');
  CREATE TYPE "public"."enum_documents_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__documents_v_version_review_status" AS ENUM('unreviewed', 'needs-confirmation', 'verified', 'rejected');
  CREATE TYPE "public"."enum__documents_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_updates_type" AS ENUM('news', 'notice', 'achievement');
  CREATE TYPE "public"."enum_updates_review_status" AS ENUM('unreviewed', 'needs-confirmation', 'verified', 'rejected');
  CREATE TYPE "public"."enum_updates_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__updates_v_version_type" AS ENUM('news', 'notice', 'achievement');
  CREATE TYPE "public"."enum__updates_v_version_review_status" AS ENUM('unreviewed', 'needs-confirmation', 'verified', 'rejected');
  CREATE TYPE "public"."enum__updates_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"department_id" integer,
  	"review_status" "enum_documents_review_status" DEFAULT 'unreviewed',
  	"legacy_url" varchar,
  	"source_url" varchar,
  	"source_snapshot_file" varchar,
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_documents_status" DEFAULT 'draft',
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "_documents_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_department_id" integer,
  	"version_review_status" "enum__documents_v_version_review_status" DEFAULT 'unreviewed',
  	"version_legacy_url" varchar,
  	"version_source_url" varchar,
  	"version_source_snapshot_file" varchar,
  	"version__objectkey" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__documents_v_version_status" DEFAULT 'draft',
  	"version_url" varchar,
  	"version_thumbnail_u_r_l" varchar,
  	"version_filename" varchar,
  	"version_mime_type" varchar,
  	"version_filesize" numeric,
  	"version_width" numeric,
  	"version_height" numeric,
  	"version_focal_x" numeric,
  	"version_focal_y" numeric,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "updates_legacy_attachments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "updates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_updates_type",
  	"title" varchar,
  	"slug" varchar,
  	"excerpt" varchar,
  	"body" jsonb,
  	"publication_date" timestamp(3) with time zone,
  	"expiry_date" timestamp(3) with time zone,
  	"featured" boolean DEFAULT false,
  	"external_link" varchar,
  	"thumbnail_id" integer,
  	"review_status" "enum_updates_review_status" DEFAULT 'unreviewed',
  	"source_url" varchar,
  	"source_snapshot_file" varchar,
  	"source_order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_updates_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "updates_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"documents_id" integer
  );
  
  CREATE TABLE "_updates_v_version_legacy_attachments" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_updates_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_type" "enum__updates_v_version_type",
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_body" jsonb,
  	"version_publication_date" timestamp(3) with time zone,
  	"version_expiry_date" timestamp(3) with time zone,
  	"version_featured" boolean DEFAULT false,
  	"version_external_link" varchar,
  	"version_thumbnail_id" integer,
  	"version_review_status" "enum__updates_v_version_review_status" DEFAULT 'unreviewed',
  	"version_source_url" varchar,
  	"version_source_snapshot_file" varchar,
  	"version_source_order" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__updates_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_updates_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"documents_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "documents_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "updates_id" integer;
  ALTER TABLE "documents" ADD CONSTRAINT "documents_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_documents_v" ADD CONSTRAINT "_documents_v_parent_id_documents_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_documents_v" ADD CONSTRAINT "_documents_v_version_department_id_departments_id_fk" FOREIGN KEY ("version_department_id") REFERENCES "public"."departments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "updates_legacy_attachments" ADD CONSTRAINT "updates_legacy_attachments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."updates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "updates" ADD CONSTRAINT "updates_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "updates_rels" ADD CONSTRAINT "updates_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."updates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "updates_rels" ADD CONSTRAINT "updates_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_updates_v_version_legacy_attachments" ADD CONSTRAINT "_updates_v_version_legacy_attachments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_updates_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_updates_v" ADD CONSTRAINT "_updates_v_parent_id_updates_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."updates"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_updates_v" ADD CONSTRAINT "_updates_v_version_thumbnail_id_media_id_fk" FOREIGN KEY ("version_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_updates_v_rels" ADD CONSTRAINT "_updates_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_updates_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_updates_v_rels" ADD CONSTRAINT "_updates_v_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "documents_department_idx" ON "documents" USING btree ("department_id");
  CREATE UNIQUE INDEX "documents_legacy_url_idx" ON "documents" USING btree ("legacy_url");
  CREATE INDEX "documents_updated_at_idx" ON "documents" USING btree ("updated_at");
  CREATE INDEX "documents_created_at_idx" ON "documents" USING btree ("created_at");
  CREATE INDEX "documents__status_idx" ON "documents" USING btree ("_status");
  CREATE UNIQUE INDEX "documents_filename_idx" ON "documents" USING btree ("filename");
  CREATE INDEX "_documents_v_parent_idx" ON "_documents_v" USING btree ("parent_id");
  CREATE INDEX "_documents_v_version_version_department_idx" ON "_documents_v" USING btree ("version_department_id");
  CREATE INDEX "_documents_v_version_version_legacy_url_idx" ON "_documents_v" USING btree ("version_legacy_url");
  CREATE INDEX "_documents_v_version_version_updated_at_idx" ON "_documents_v" USING btree ("version_updated_at");
  CREATE INDEX "_documents_v_version_version_created_at_idx" ON "_documents_v" USING btree ("version_created_at");
  CREATE INDEX "_documents_v_version_version__status_idx" ON "_documents_v" USING btree ("version__status");
  CREATE INDEX "_documents_v_version_version_filename_idx" ON "_documents_v" USING btree ("version_filename");
  CREATE INDEX "_documents_v_created_at_idx" ON "_documents_v" USING btree ("created_at");
  CREATE INDEX "_documents_v_updated_at_idx" ON "_documents_v" USING btree ("updated_at");
  CREATE INDEX "_documents_v_latest_idx" ON "_documents_v" USING btree ("latest");
  CREATE INDEX "updates_legacy_attachments_order_idx" ON "updates_legacy_attachments" USING btree ("_order");
  CREATE INDEX "updates_legacy_attachments_parent_id_idx" ON "updates_legacy_attachments" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "updates_slug_idx" ON "updates" USING btree ("slug");
  CREATE INDEX "updates_publication_date_idx" ON "updates" USING btree ("publication_date");
  CREATE INDEX "updates_expiry_date_idx" ON "updates" USING btree ("expiry_date");
  CREATE INDEX "updates_thumbnail_idx" ON "updates" USING btree ("thumbnail_id");
  CREATE INDEX "updates_updated_at_idx" ON "updates" USING btree ("updated_at");
  CREATE INDEX "updates_created_at_idx" ON "updates" USING btree ("created_at");
  CREATE INDEX "updates__status_idx" ON "updates" USING btree ("_status");
  CREATE INDEX "updates_rels_order_idx" ON "updates_rels" USING btree ("order");
  CREATE INDEX "updates_rels_parent_idx" ON "updates_rels" USING btree ("parent_id");
  CREATE INDEX "updates_rels_path_idx" ON "updates_rels" USING btree ("path");
  CREATE INDEX "updates_rels_documents_id_idx" ON "updates_rels" USING btree ("documents_id");
  CREATE INDEX "_updates_v_version_legacy_attachments_order_idx" ON "_updates_v_version_legacy_attachments" USING btree ("_order");
  CREATE INDEX "_updates_v_version_legacy_attachments_parent_id_idx" ON "_updates_v_version_legacy_attachments" USING btree ("_parent_id");
  CREATE INDEX "_updates_v_parent_idx" ON "_updates_v" USING btree ("parent_id");
  CREATE INDEX "_updates_v_version_version_slug_idx" ON "_updates_v" USING btree ("version_slug");
  CREATE INDEX "_updates_v_version_version_publication_date_idx" ON "_updates_v" USING btree ("version_publication_date");
  CREATE INDEX "_updates_v_version_version_expiry_date_idx" ON "_updates_v" USING btree ("version_expiry_date");
  CREATE INDEX "_updates_v_version_version_thumbnail_idx" ON "_updates_v" USING btree ("version_thumbnail_id");
  CREATE INDEX "_updates_v_version_version_updated_at_idx" ON "_updates_v" USING btree ("version_updated_at");
  CREATE INDEX "_updates_v_version_version_created_at_idx" ON "_updates_v" USING btree ("version_created_at");
  CREATE INDEX "_updates_v_version_version__status_idx" ON "_updates_v" USING btree ("version__status");
  CREATE INDEX "_updates_v_created_at_idx" ON "_updates_v" USING btree ("created_at");
  CREATE INDEX "_updates_v_updated_at_idx" ON "_updates_v" USING btree ("updated_at");
  CREATE INDEX "_updates_v_latest_idx" ON "_updates_v" USING btree ("latest");
  CREATE INDEX "_updates_v_rels_order_idx" ON "_updates_v_rels" USING btree ("order");
  CREATE INDEX "_updates_v_rels_parent_idx" ON "_updates_v_rels" USING btree ("parent_id");
  CREATE INDEX "_updates_v_rels_path_idx" ON "_updates_v_rels" USING btree ("path");
  CREATE INDEX "_updates_v_rels_documents_id_idx" ON "_updates_v_rels" USING btree ("documents_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_updates_fk" FOREIGN KEY ("updates_id") REFERENCES "public"."updates"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("documents_id");
  CREATE INDEX "payload_locked_documents_rels_updates_id_idx" ON "payload_locked_documents_rels" USING btree ("updates_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "documents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_documents_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "updates_legacy_attachments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "updates" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "updates_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_updates_v_version_legacy_attachments" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_updates_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_updates_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "documents" CASCADE;
  DROP TABLE "_documents_v" CASCADE;
  DROP TABLE "updates_legacy_attachments" CASCADE;
  DROP TABLE "updates" CASCADE;
  DROP TABLE "updates_rels" CASCADE;
  DROP TABLE "_updates_v_version_legacy_attachments" CASCADE;
  DROP TABLE "_updates_v" CASCADE;
  DROP TABLE "_updates_v_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_documents_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_updates_fk";
  
  DROP INDEX "payload_locked_documents_rels_documents_id_idx";
  DROP INDEX "payload_locked_documents_rels_updates_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "documents_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "updates_id";
  DROP TYPE "public"."enum_documents_review_status";
  DROP TYPE "public"."enum_documents_status";
  DROP TYPE "public"."enum__documents_v_version_review_status";
  DROP TYPE "public"."enum__documents_v_version_status";
  DROP TYPE "public"."enum_updates_type";
  DROP TYPE "public"."enum_updates_review_status";
  DROP TYPE "public"."enum_updates_status";
  DROP TYPE "public"."enum__updates_v_version_type";
  DROP TYPE "public"."enum__updates_v_version_review_status";
  DROP TYPE "public"."enum__updates_v_version_status";`)
}
