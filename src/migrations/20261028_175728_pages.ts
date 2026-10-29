import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_callout_tone" AS ENUM('neutral', 'information', 'important');
  CREATE TYPE "public"."enum_pages_blocks_link_list_links_destination_type" AS ENUM('page', 'internal-path', 'external-url', 'document');
  CREATE TYPE "public"."enum_pages_blocks_embed_provider" AS ENUM('google-maps', 'youtube');
  CREATE TYPE "public"."enum_pages_review_status" AS ENUM('unreviewed', 'needs-confirmation', 'verified', 'rejected');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_callout_tone" AS ENUM('neutral', 'information', 'important');
  CREATE TYPE "public"."enum__pages_v_blocks_link_list_links_destination_type" AS ENUM('page', 'internal-path', 'external-url', 'document');
  CREATE TYPE "public"."enum__pages_v_blocks_embed_provider" AS ENUM('google-maps', 'youtube');
  CREATE TYPE "public"."enum__pages_v_version_review_status" AS ENUM('unreviewed', 'needs-confirmation', 'verified', 'rejected');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  ALTER TYPE "public"."enum_site_utility_links_destination_type" ADD VALUE 'page' BEFORE 'internal-path';
  ALTER TYPE "public"."enum_site_primary_links_destination_type" ADD VALUE 'page' BEFORE 'internal-path';
  ALTER TYPE "public"."enum_site_navigation_groups_links_destination_type" ADD VALUE 'page' BEFORE 'internal-path';
  ALTER TYPE "public"."enum_site_announcements_destination_type" ADD VALUE 'page' BEFORE 'internal-path';
  ALTER TYPE "public"."enum_site_footer_links_destination_type" ADD VALUE 'page' BEFORE 'internal-path';
  ALTER TYPE "public"."enum__site_v_version_utility_links_destination_type" ADD VALUE 'page' BEFORE 'internal-path';
  ALTER TYPE "public"."enum__site_v_version_primary_links_destination_type" ADD VALUE 'page' BEFORE 'internal-path';
  ALTER TYPE "public"."enum__site_v_version_navigation_groups_links_destination_type" ADD VALUE 'page' BEFORE 'internal-path';
  ALTER TYPE "public"."enum__site_v_version_announcements_destination_type" ADD VALUE 'page' BEFORE 'internal-path';
  ALTER TYPE "public"."enum__site_v_version_footer_links_destination_type" ADD VALUE 'page' BEFORE 'internal-path';
  ALTER TYPE "public"."enum_home_hero_slides_destination_type" ADD VALUE 'page' BEFORE 'internal-path';
  ALTER TYPE "public"."enum__home_v_version_hero_slides_destination_type" ADD VALUE 'page' BEFORE 'internal-path';
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"tone" "enum_pages_blocks_callout_tone" DEFAULT 'neutral',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_link_list_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"destination_type" "enum_pages_blocks_link_list_links_destination_type" DEFAULT 'internal-path',
  	"page_id" integer,
  	"internal_path" varchar,
  	"external_url" varchar,
  	"document_id" integer,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_link_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_document_list_legacy_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_document_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"legacy_image_url" varchar,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_table_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar
  );
  
  CREATE TABLE "pages_blocks_table_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"provider" "enum_pages_blocks_embed_provider",
  	"url" varchar,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"summary" varchar,
  	"review_status" "enum_pages_review_status" DEFAULT 'unreviewed',
  	"legacy_path" varchar,
  	"source_url" varchar,
  	"source_snapshot_file" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"documents_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"body" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"tone" "enum__pages_v_blocks_callout_tone" DEFAULT 'neutral',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_link_list_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"destination_type" "enum__pages_v_blocks_link_list_links_destination_type" DEFAULT 'internal-path',
  	"page_id" integer,
  	"internal_path" varchar,
  	"external_url" varchar,
  	"document_id" integer,
  	"open_in_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_link_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_document_list_legacy_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_document_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"legacy_image_url" varchar,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_table_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_table_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"provider" "enum__pages_v_blocks_embed_provider",
  	"url" varchar,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_summary" varchar,
  	"version_review_status" "enum__pages_v_version_review_status" DEFAULT 'unreviewed',
  	"version_legacy_path" varchar,
  	"version_source_url" varchar,
  	"version_source_snapshot_file" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"documents_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "site_utility_links" ADD COLUMN "page_id" integer;
  ALTER TABLE "site_primary_links" ADD COLUMN "page_id" integer;
  ALTER TABLE "site_navigation_groups_links" ADD COLUMN "page_id" integer;
  ALTER TABLE "site_announcements" ADD COLUMN "page_id" integer;
  ALTER TABLE "site_footer_links" ADD COLUMN "page_id" integer;
  ALTER TABLE "_site_v_version_utility_links" ADD COLUMN "page_id" integer;
  ALTER TABLE "_site_v_version_primary_links" ADD COLUMN "page_id" integer;
  ALTER TABLE "_site_v_version_navigation_groups_links" ADD COLUMN "page_id" integer;
  ALTER TABLE "_site_v_version_announcements" ADD COLUMN "page_id" integer;
  ALTER TABLE "_site_v_version_footer_links" ADD COLUMN "page_id" integer;
  ALTER TABLE "home_hero_slides" ADD COLUMN "page_id" integer;
  ALTER TABLE "_home_v_version_hero_slides" ADD COLUMN "page_id" integer;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_callout" ADD CONSTRAINT "pages_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_link_list_links" ADD CONSTRAINT "pages_blocks_link_list_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_link_list_links" ADD CONSTRAINT "pages_blocks_link_list_links_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_link_list_links" ADD CONSTRAINT "pages_blocks_link_list_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_link_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_link_list" ADD CONSTRAINT "pages_blocks_link_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_document_list_legacy_documents" ADD CONSTRAINT "pages_blocks_document_list_legacy_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_document_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_document_list" ADD CONSTRAINT "pages_blocks_document_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media" ADD CONSTRAINT "pages_blocks_media_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media" ADD CONSTRAINT "pages_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_table_columns" ADD CONSTRAINT "pages_blocks_table_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_table_rows_cells" ADD CONSTRAINT "pages_blocks_table_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_table_rows" ADD CONSTRAINT "pages_blocks_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_table" ADD CONSTRAINT "pages_blocks_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_embed" ADD CONSTRAINT "pages_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_callout" ADD CONSTRAINT "_pages_v_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_link_list_links" ADD CONSTRAINT "_pages_v_blocks_link_list_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_link_list_links" ADD CONSTRAINT "_pages_v_blocks_link_list_links_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_link_list_links" ADD CONSTRAINT "_pages_v_blocks_link_list_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_link_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_link_list" ADD CONSTRAINT "_pages_v_blocks_link_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_document_list_legacy_documents" ADD CONSTRAINT "_pages_v_blocks_document_list_legacy_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_document_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_document_list" ADD CONSTRAINT "_pages_v_blocks_document_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media" ADD CONSTRAINT "_pages_v_blocks_media_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media" ADD CONSTRAINT "_pages_v_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_table_columns" ADD CONSTRAINT "_pages_v_blocks_table_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_table_rows_cells" ADD CONSTRAINT "_pages_v_blocks_table_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_table_rows" ADD CONSTRAINT "_pages_v_blocks_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_table" ADD CONSTRAINT "_pages_v_blocks_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_embed" ADD CONSTRAINT "_pages_v_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_callout_order_idx" ON "pages_blocks_callout" USING btree ("_order");
  CREATE INDEX "pages_blocks_callout_parent_id_idx" ON "pages_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_callout_path_idx" ON "pages_blocks_callout" USING btree ("_path");
  CREATE INDEX "pages_blocks_link_list_links_order_idx" ON "pages_blocks_link_list_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_link_list_links_parent_id_idx" ON "pages_blocks_link_list_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_link_list_links_page_idx" ON "pages_blocks_link_list_links" USING btree ("page_id");
  CREATE INDEX "pages_blocks_link_list_links_document_idx" ON "pages_blocks_link_list_links" USING btree ("document_id");
  CREATE INDEX "pages_blocks_link_list_order_idx" ON "pages_blocks_link_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_link_list_parent_id_idx" ON "pages_blocks_link_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_link_list_path_idx" ON "pages_blocks_link_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_document_list_legacy_documents_order_idx" ON "pages_blocks_document_list_legacy_documents" USING btree ("_order");
  CREATE INDEX "pages_blocks_document_list_legacy_documents_parent_id_idx" ON "pages_blocks_document_list_legacy_documents" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_document_list_order_idx" ON "pages_blocks_document_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_document_list_parent_id_idx" ON "pages_blocks_document_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_document_list_path_idx" ON "pages_blocks_document_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_order_idx" ON "pages_blocks_media" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_parent_id_idx" ON "pages_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_path_idx" ON "pages_blocks_media" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_image_idx" ON "pages_blocks_media" USING btree ("image_id");
  CREATE INDEX "pages_blocks_table_columns_order_idx" ON "pages_blocks_table_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_table_columns_parent_id_idx" ON "pages_blocks_table_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_table_rows_cells_order_idx" ON "pages_blocks_table_rows_cells" USING btree ("_order");
  CREATE INDEX "pages_blocks_table_rows_cells_parent_id_idx" ON "pages_blocks_table_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_table_rows_order_idx" ON "pages_blocks_table_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_table_rows_parent_id_idx" ON "pages_blocks_table_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_table_order_idx" ON "pages_blocks_table" USING btree ("_order");
  CREATE INDEX "pages_blocks_table_parent_id_idx" ON "pages_blocks_table" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_table_path_idx" ON "pages_blocks_table" USING btree ("_path");
  CREATE INDEX "pages_blocks_embed_order_idx" ON "pages_blocks_embed" USING btree ("_order");
  CREATE INDEX "pages_blocks_embed_parent_id_idx" ON "pages_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_embed_path_idx" ON "pages_blocks_embed" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE UNIQUE INDEX "pages_legacy_path_idx" ON "pages" USING btree ("legacy_path");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_documents_id_idx" ON "pages_rels" USING btree ("documents_id");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_callout_order_idx" ON "_pages_v_blocks_callout" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_callout_parent_id_idx" ON "_pages_v_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_callout_path_idx" ON "_pages_v_blocks_callout" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_link_list_links_order_idx" ON "_pages_v_blocks_link_list_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_link_list_links_parent_id_idx" ON "_pages_v_blocks_link_list_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_link_list_links_page_idx" ON "_pages_v_blocks_link_list_links" USING btree ("page_id");
  CREATE INDEX "_pages_v_blocks_link_list_links_document_idx" ON "_pages_v_blocks_link_list_links" USING btree ("document_id");
  CREATE INDEX "_pages_v_blocks_link_list_order_idx" ON "_pages_v_blocks_link_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_link_list_parent_id_idx" ON "_pages_v_blocks_link_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_link_list_path_idx" ON "_pages_v_blocks_link_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_document_list_legacy_documents_order_idx" ON "_pages_v_blocks_document_list_legacy_documents" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_document_list_legacy_documents_parent_id_idx" ON "_pages_v_blocks_document_list_legacy_documents" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_document_list_order_idx" ON "_pages_v_blocks_document_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_document_list_parent_id_idx" ON "_pages_v_blocks_document_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_document_list_path_idx" ON "_pages_v_blocks_document_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_order_idx" ON "_pages_v_blocks_media" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_parent_id_idx" ON "_pages_v_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_path_idx" ON "_pages_v_blocks_media" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_image_idx" ON "_pages_v_blocks_media" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_table_columns_order_idx" ON "_pages_v_blocks_table_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_table_columns_parent_id_idx" ON "_pages_v_blocks_table_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_table_rows_cells_order_idx" ON "_pages_v_blocks_table_rows_cells" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_table_rows_cells_parent_id_idx" ON "_pages_v_blocks_table_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_table_rows_order_idx" ON "_pages_v_blocks_table_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_table_rows_parent_id_idx" ON "_pages_v_blocks_table_rows" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_table_order_idx" ON "_pages_v_blocks_table" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_table_parent_id_idx" ON "_pages_v_blocks_table" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_table_path_idx" ON "_pages_v_blocks_table" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_embed_order_idx" ON "_pages_v_blocks_embed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_embed_parent_id_idx" ON "_pages_v_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_embed_path_idx" ON "_pages_v_blocks_embed" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_legacy_path_idx" ON "_pages_v" USING btree ("version_legacy_path");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_documents_id_idx" ON "_pages_v_rels" USING btree ("documents_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_utility_links" ADD CONSTRAINT "site_utility_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_primary_links" ADD CONSTRAINT "site_primary_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_navigation_groups_links" ADD CONSTRAINT "site_navigation_groups_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_announcements" ADD CONSTRAINT "site_announcements_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_footer_links" ADD CONSTRAINT "site_footer_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_v_version_utility_links" ADD CONSTRAINT "_site_v_version_utility_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_v_version_primary_links" ADD CONSTRAINT "_site_v_version_primary_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_v_version_navigation_groups_links" ADD CONSTRAINT "_site_v_version_navigation_groups_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_v_version_announcements" ADD CONSTRAINT "_site_v_version_announcements_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_v_version_footer_links" ADD CONSTRAINT "_site_v_version_footer_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_hero_slides" ADD CONSTRAINT "home_hero_slides_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_version_hero_slides" ADD CONSTRAINT "_home_v_version_hero_slides_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "site_utility_links_page_idx" ON "site_utility_links" USING btree ("page_id");
  CREATE INDEX "site_primary_links_page_idx" ON "site_primary_links" USING btree ("page_id");
  CREATE INDEX "site_navigation_groups_links_page_idx" ON "site_navigation_groups_links" USING btree ("page_id");
  CREATE INDEX "site_announcements_page_idx" ON "site_announcements" USING btree ("page_id");
  CREATE INDEX "site_footer_links_page_idx" ON "site_footer_links" USING btree ("page_id");
  CREATE INDEX "_site_v_version_utility_links_page_idx" ON "_site_v_version_utility_links" USING btree ("page_id");
  CREATE INDEX "_site_v_version_primary_links_page_idx" ON "_site_v_version_primary_links" USING btree ("page_id");
  CREATE INDEX "_site_v_version_navigation_groups_links_page_idx" ON "_site_v_version_navigation_groups_links" USING btree ("page_id");
  CREATE INDEX "_site_v_version_announcements_page_idx" ON "_site_v_version_announcements" USING btree ("page_id");
  CREATE INDEX "_site_v_version_footer_links_page_idx" ON "_site_v_version_footer_links" USING btree ("page_id");
  CREATE INDEX "home_hero_slides_page_idx" ON "home_hero_slides" USING btree ("page_id");
  CREATE INDEX "_home_v_version_hero_slides_page_idx" ON "_home_v_version_hero_slides" USING btree ("page_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_callout" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_link_list_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_link_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_document_list_legacy_documents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_document_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_table_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_table_rows_cells" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_table_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_table" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_callout" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_link_list_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_link_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_document_list_legacy_documents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_document_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_table_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_table_rows_cells" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_table_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_table" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_callout" CASCADE;
  DROP TABLE "pages_blocks_link_list_links" CASCADE;
  DROP TABLE "pages_blocks_link_list" CASCADE;
  DROP TABLE "pages_blocks_document_list_legacy_documents" CASCADE;
  DROP TABLE "pages_blocks_document_list" CASCADE;
  DROP TABLE "pages_blocks_media" CASCADE;
  DROP TABLE "pages_blocks_table_columns" CASCADE;
  DROP TABLE "pages_blocks_table_rows_cells" CASCADE;
  DROP TABLE "pages_blocks_table_rows" CASCADE;
  DROP TABLE "pages_blocks_table" CASCADE;
  DROP TABLE "pages_blocks_embed" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_callout" CASCADE;
  DROP TABLE "_pages_v_blocks_link_list_links" CASCADE;
  DROP TABLE "_pages_v_blocks_link_list" CASCADE;
  DROP TABLE "_pages_v_blocks_document_list_legacy_documents" CASCADE;
  DROP TABLE "_pages_v_blocks_document_list" CASCADE;
  DROP TABLE "_pages_v_blocks_media" CASCADE;
  DROP TABLE "_pages_v_blocks_table_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_table_rows_cells" CASCADE;
  DROP TABLE "_pages_v_blocks_table_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_table" CASCADE;
  DROP TABLE "_pages_v_blocks_embed" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_fk";
  
  ALTER TABLE "site_utility_links" DROP CONSTRAINT "site_utility_links_page_id_pages_id_fk";
  
  ALTER TABLE "site_primary_links" DROP CONSTRAINT "site_primary_links_page_id_pages_id_fk";
  
  ALTER TABLE "site_navigation_groups_links" DROP CONSTRAINT "site_navigation_groups_links_page_id_pages_id_fk";
  
  ALTER TABLE "site_announcements" DROP CONSTRAINT "site_announcements_page_id_pages_id_fk";
  
  ALTER TABLE "site_footer_links" DROP CONSTRAINT "site_footer_links_page_id_pages_id_fk";
  
  ALTER TABLE "_site_v_version_utility_links" DROP CONSTRAINT "_site_v_version_utility_links_page_id_pages_id_fk";
  
  ALTER TABLE "_site_v_version_primary_links" DROP CONSTRAINT "_site_v_version_primary_links_page_id_pages_id_fk";
  
  ALTER TABLE "_site_v_version_navigation_groups_links" DROP CONSTRAINT "_site_v_version_navigation_groups_links_page_id_pages_id_fk";
  
  ALTER TABLE "_site_v_version_announcements" DROP CONSTRAINT "_site_v_version_announcements_page_id_pages_id_fk";
  
  ALTER TABLE "_site_v_version_footer_links" DROP CONSTRAINT "_site_v_version_footer_links_page_id_pages_id_fk";
  
  ALTER TABLE "home_hero_slides" DROP CONSTRAINT "home_hero_slides_page_id_pages_id_fk";
  
  ALTER TABLE "_home_v_version_hero_slides" DROP CONSTRAINT "_home_v_version_hero_slides_page_id_pages_id_fk";
  
  ALTER TABLE "site_utility_links" ALTER COLUMN "destination_type" SET DATA TYPE text;
  ALTER TABLE "site_utility_links" ALTER COLUMN "destination_type" SET DEFAULT 'internal-path'::text;
  DROP TYPE "public"."enum_site_utility_links_destination_type";
  CREATE TYPE "public"."enum_site_utility_links_destination_type" AS ENUM('internal-path', 'external-url', 'document');
  ALTER TABLE "site_utility_links" ALTER COLUMN "destination_type" SET DEFAULT 'internal-path'::"public"."enum_site_utility_links_destination_type";
  ALTER TABLE "site_utility_links" ALTER COLUMN "destination_type" SET DATA TYPE "public"."enum_site_utility_links_destination_type" USING "destination_type"::"public"."enum_site_utility_links_destination_type";
  ALTER TABLE "site_primary_links" ALTER COLUMN "destination_type" SET DATA TYPE text;
  ALTER TABLE "site_primary_links" ALTER COLUMN "destination_type" SET DEFAULT 'internal-path'::text;
  DROP TYPE "public"."enum_site_primary_links_destination_type";
  CREATE TYPE "public"."enum_site_primary_links_destination_type" AS ENUM('internal-path', 'external-url', 'document');
  ALTER TABLE "site_primary_links" ALTER COLUMN "destination_type" SET DEFAULT 'internal-path'::"public"."enum_site_primary_links_destination_type";
  ALTER TABLE "site_primary_links" ALTER COLUMN "destination_type" SET DATA TYPE "public"."enum_site_primary_links_destination_type" USING "destination_type"::"public"."enum_site_primary_links_destination_type";
  ALTER TABLE "site_navigation_groups_links" ALTER COLUMN "destination_type" SET DATA TYPE text;
  ALTER TABLE "site_navigation_groups_links" ALTER COLUMN "destination_type" SET DEFAULT 'internal-path'::text;
  DROP TYPE "public"."enum_site_navigation_groups_links_destination_type";
  CREATE TYPE "public"."enum_site_navigation_groups_links_destination_type" AS ENUM('internal-path', 'external-url', 'document');
  ALTER TABLE "site_navigation_groups_links" ALTER COLUMN "destination_type" SET DEFAULT 'internal-path'::"public"."enum_site_navigation_groups_links_destination_type";
  ALTER TABLE "site_navigation_groups_links" ALTER COLUMN "destination_type" SET DATA TYPE "public"."enum_site_navigation_groups_links_destination_type" USING "destination_type"::"public"."enum_site_navigation_groups_links_destination_type";
  ALTER TABLE "site_announcements" ALTER COLUMN "destination_type" SET DATA TYPE text;
  ALTER TABLE "site_announcements" ALTER COLUMN "destination_type" SET DEFAULT 'none'::text;
  DROP TYPE "public"."enum_site_announcements_destination_type";
  CREATE TYPE "public"."enum_site_announcements_destination_type" AS ENUM('none', 'internal-path', 'external-url', 'document');
  ALTER TABLE "site_announcements" ALTER COLUMN "destination_type" SET DEFAULT 'none'::"public"."enum_site_announcements_destination_type";
  ALTER TABLE "site_announcements" ALTER COLUMN "destination_type" SET DATA TYPE "public"."enum_site_announcements_destination_type" USING "destination_type"::"public"."enum_site_announcements_destination_type";
  ALTER TABLE "site_footer_links" ALTER COLUMN "destination_type" SET DATA TYPE text;
  ALTER TABLE "site_footer_links" ALTER COLUMN "destination_type" SET DEFAULT 'internal-path'::text;
  DROP TYPE "public"."enum_site_footer_links_destination_type";
  CREATE TYPE "public"."enum_site_footer_links_destination_type" AS ENUM('internal-path', 'external-url', 'document');
  ALTER TABLE "site_footer_links" ALTER COLUMN "destination_type" SET DEFAULT 'internal-path'::"public"."enum_site_footer_links_destination_type";
  ALTER TABLE "site_footer_links" ALTER COLUMN "destination_type" SET DATA TYPE "public"."enum_site_footer_links_destination_type" USING "destination_type"::"public"."enum_site_footer_links_destination_type";
  ALTER TABLE "_site_v_version_utility_links" ALTER COLUMN "destination_type" SET DATA TYPE text;
  ALTER TABLE "_site_v_version_utility_links" ALTER COLUMN "destination_type" SET DEFAULT 'internal-path'::text;
  DROP TYPE "public"."enum__site_v_version_utility_links_destination_type";
  CREATE TYPE "public"."enum__site_v_version_utility_links_destination_type" AS ENUM('internal-path', 'external-url', 'document');
  ALTER TABLE "_site_v_version_utility_links" ALTER COLUMN "destination_type" SET DEFAULT 'internal-path'::"public"."enum__site_v_version_utility_links_destination_type";
  ALTER TABLE "_site_v_version_utility_links" ALTER COLUMN "destination_type" SET DATA TYPE "public"."enum__site_v_version_utility_links_destination_type" USING "destination_type"::"public"."enum__site_v_version_utility_links_destination_type";
  ALTER TABLE "_site_v_version_primary_links" ALTER COLUMN "destination_type" SET DATA TYPE text;
  ALTER TABLE "_site_v_version_primary_links" ALTER COLUMN "destination_type" SET DEFAULT 'internal-path'::text;
  DROP TYPE "public"."enum__site_v_version_primary_links_destination_type";
  CREATE TYPE "public"."enum__site_v_version_primary_links_destination_type" AS ENUM('internal-path', 'external-url', 'document');
  ALTER TABLE "_site_v_version_primary_links" ALTER COLUMN "destination_type" SET DEFAULT 'internal-path'::"public"."enum__site_v_version_primary_links_destination_type";
  ALTER TABLE "_site_v_version_primary_links" ALTER COLUMN "destination_type" SET DATA TYPE "public"."enum__site_v_version_primary_links_destination_type" USING "destination_type"::"public"."enum__site_v_version_primary_links_destination_type";
  ALTER TABLE "_site_v_version_navigation_groups_links" ALTER COLUMN "destination_type" SET DATA TYPE text;
  ALTER TABLE "_site_v_version_navigation_groups_links" ALTER COLUMN "destination_type" SET DEFAULT 'internal-path'::text;
  DROP TYPE "public"."enum__site_v_version_navigation_groups_links_destination_type";
  CREATE TYPE "public"."enum__site_v_version_navigation_groups_links_destination_type" AS ENUM('internal-path', 'external-url', 'document');
  ALTER TABLE "_site_v_version_navigation_groups_links" ALTER COLUMN "destination_type" SET DEFAULT 'internal-path'::"public"."enum__site_v_version_navigation_groups_links_destination_type";
  ALTER TABLE "_site_v_version_navigation_groups_links" ALTER COLUMN "destination_type" SET DATA TYPE "public"."enum__site_v_version_navigation_groups_links_destination_type" USING "destination_type"::"public"."enum__site_v_version_navigation_groups_links_destination_type";
  ALTER TABLE "_site_v_version_announcements" ALTER COLUMN "destination_type" SET DATA TYPE text;
  ALTER TABLE "_site_v_version_announcements" ALTER COLUMN "destination_type" SET DEFAULT 'none'::text;
  DROP TYPE "public"."enum__site_v_version_announcements_destination_type";
  CREATE TYPE "public"."enum__site_v_version_announcements_destination_type" AS ENUM('none', 'internal-path', 'external-url', 'document');
  ALTER TABLE "_site_v_version_announcements" ALTER COLUMN "destination_type" SET DEFAULT 'none'::"public"."enum__site_v_version_announcements_destination_type";
  ALTER TABLE "_site_v_version_announcements" ALTER COLUMN "destination_type" SET DATA TYPE "public"."enum__site_v_version_announcements_destination_type" USING "destination_type"::"public"."enum__site_v_version_announcements_destination_type";
  ALTER TABLE "_site_v_version_footer_links" ALTER COLUMN "destination_type" SET DATA TYPE text;
  ALTER TABLE "_site_v_version_footer_links" ALTER COLUMN "destination_type" SET DEFAULT 'internal-path'::text;
  DROP TYPE "public"."enum__site_v_version_footer_links_destination_type";
  CREATE TYPE "public"."enum__site_v_version_footer_links_destination_type" AS ENUM('internal-path', 'external-url', 'document');
  ALTER TABLE "_site_v_version_footer_links" ALTER COLUMN "destination_type" SET DEFAULT 'internal-path'::"public"."enum__site_v_version_footer_links_destination_type";
  ALTER TABLE "_site_v_version_footer_links" ALTER COLUMN "destination_type" SET DATA TYPE "public"."enum__site_v_version_footer_links_destination_type" USING "destination_type"::"public"."enum__site_v_version_footer_links_destination_type";
  ALTER TABLE "home_hero_slides" ALTER COLUMN "destination_type" SET DATA TYPE text;
  ALTER TABLE "home_hero_slides" ALTER COLUMN "destination_type" SET DEFAULT 'none'::text;
  DROP TYPE "public"."enum_home_hero_slides_destination_type";
  CREATE TYPE "public"."enum_home_hero_slides_destination_type" AS ENUM('none', 'internal-path', 'external-url', 'document');
  ALTER TABLE "home_hero_slides" ALTER COLUMN "destination_type" SET DEFAULT 'none'::"public"."enum_home_hero_slides_destination_type";
  ALTER TABLE "home_hero_slides" ALTER COLUMN "destination_type" SET DATA TYPE "public"."enum_home_hero_slides_destination_type" USING "destination_type"::"public"."enum_home_hero_slides_destination_type";
  ALTER TABLE "_home_v_version_hero_slides" ALTER COLUMN "destination_type" SET DATA TYPE text;
  ALTER TABLE "_home_v_version_hero_slides" ALTER COLUMN "destination_type" SET DEFAULT 'none'::text;
  DROP TYPE "public"."enum__home_v_version_hero_slides_destination_type";
  CREATE TYPE "public"."enum__home_v_version_hero_slides_destination_type" AS ENUM('none', 'internal-path', 'external-url', 'document');
  ALTER TABLE "_home_v_version_hero_slides" ALTER COLUMN "destination_type" SET DEFAULT 'none'::"public"."enum__home_v_version_hero_slides_destination_type";
  ALTER TABLE "_home_v_version_hero_slides" ALTER COLUMN "destination_type" SET DATA TYPE "public"."enum__home_v_version_hero_slides_destination_type" USING "destination_type"::"public"."enum__home_v_version_hero_slides_destination_type";
  DROP INDEX "payload_locked_documents_rels_pages_id_idx";
  DROP INDEX "site_utility_links_page_idx";
  DROP INDEX "site_primary_links_page_idx";
  DROP INDEX "site_navigation_groups_links_page_idx";
  DROP INDEX "site_announcements_page_idx";
  DROP INDEX "site_footer_links_page_idx";
  DROP INDEX "_site_v_version_utility_links_page_idx";
  DROP INDEX "_site_v_version_primary_links_page_idx";
  DROP INDEX "_site_v_version_navigation_groups_links_page_idx";
  DROP INDEX "_site_v_version_announcements_page_idx";
  DROP INDEX "_site_v_version_footer_links_page_idx";
  DROP INDEX "home_hero_slides_page_idx";
  DROP INDEX "_home_v_version_hero_slides_page_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pages_id";
  ALTER TABLE "site_utility_links" DROP COLUMN "page_id";
  ALTER TABLE "site_primary_links" DROP COLUMN "page_id";
  ALTER TABLE "site_navigation_groups_links" DROP COLUMN "page_id";
  ALTER TABLE "site_announcements" DROP COLUMN "page_id";
  ALTER TABLE "site_footer_links" DROP COLUMN "page_id";
  ALTER TABLE "_site_v_version_utility_links" DROP COLUMN "page_id";
  ALTER TABLE "_site_v_version_primary_links" DROP COLUMN "page_id";
  ALTER TABLE "_site_v_version_navigation_groups_links" DROP COLUMN "page_id";
  ALTER TABLE "_site_v_version_announcements" DROP COLUMN "page_id";
  ALTER TABLE "_site_v_version_footer_links" DROP COLUMN "page_id";
  ALTER TABLE "home_hero_slides" DROP COLUMN "page_id";
  ALTER TABLE "_home_v_version_hero_slides" DROP COLUMN "page_id";
  DROP TYPE "public"."enum_pages_blocks_callout_tone";
  DROP TYPE "public"."enum_pages_blocks_link_list_links_destination_type";
  DROP TYPE "public"."enum_pages_blocks_embed_provider";
  DROP TYPE "public"."enum_pages_review_status";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_callout_tone";
  DROP TYPE "public"."enum__pages_v_blocks_link_list_links_destination_type";
  DROP TYPE "public"."enum__pages_v_blocks_embed_provider";
  DROP TYPE "public"."enum__pages_v_version_review_status";
  DROP TYPE "public"."enum__pages_v_version_status";`)
}
