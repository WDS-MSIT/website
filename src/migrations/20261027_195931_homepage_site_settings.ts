import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_utility_links_destination_type" AS ENUM('internal-path', 'external-url', 'document');
  CREATE TYPE "public"."enum_site_primary_links_destination_type" AS ENUM('internal-path', 'external-url', 'document');
  CREATE TYPE "public"."enum_site_navigation_groups_links_destination_type" AS ENUM('internal-path', 'external-url', 'document');
  CREATE TYPE "public"."enum_site_announcements_destination_type" AS ENUM('none', 'internal-path', 'external-url', 'document');
  CREATE TYPE "public"."enum_site_footer_links_destination_type" AS ENUM('internal-path', 'external-url', 'document');
  CREATE TYPE "public"."enum_site_review_status" AS ENUM('unreviewed', 'needs-confirmation', 'verified', 'rejected');
  CREATE TYPE "public"."enum_site_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_v_version_utility_links_destination_type" AS ENUM('internal-path', 'external-url', 'document');
  CREATE TYPE "public"."enum__site_v_version_primary_links_destination_type" AS ENUM('internal-path', 'external-url', 'document');
  CREATE TYPE "public"."enum__site_v_version_navigation_groups_links_destination_type" AS ENUM('internal-path', 'external-url', 'document');
  CREATE TYPE "public"."enum__site_v_version_announcements_destination_type" AS ENUM('none', 'internal-path', 'external-url', 'document');
  CREATE TYPE "public"."enum__site_v_version_footer_links_destination_type" AS ENUM('internal-path', 'external-url', 'document');
  CREATE TYPE "public"."enum__site_v_version_review_status" AS ENUM('unreviewed', 'needs-confirmation', 'verified', 'rejected');
  CREATE TYPE "public"."enum__site_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_home_hero_slides_destination_type" AS ENUM('none', 'internal-path', 'external-url', 'document');
  CREATE TYPE "public"."enum_home_update_sections_update_type" AS ENUM('news', 'notice', 'achievement');
  CREATE TYPE "public"."enum_home_update_sections_selection_mode" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum_home_review_status" AS ENUM('unreviewed', 'needs-confirmation', 'verified', 'rejected');
  CREATE TYPE "public"."enum_home_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_v_version_hero_slides_destination_type" AS ENUM('none', 'internal-path', 'external-url', 'document');
  CREATE TYPE "public"."enum__home_v_version_update_sections_update_type" AS ENUM('news', 'notice', 'achievement');
  CREATE TYPE "public"."enum__home_v_version_update_sections_selection_mode" AS ENUM('latest', 'manual');
  CREATE TYPE "public"."enum__home_v_version_review_status" AS ENUM('unreviewed', 'needs-confirmation', 'verified', 'rejected');
  CREATE TYPE "public"."enum__home_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "site_contact_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "site_utility_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"destination_type" "enum_site_utility_links_destination_type" DEFAULT 'internal-path',
  	"internal_path" varchar,
  	"external_url" varchar,
  	"document_id" integer,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "site_primary_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"destination_type" "enum_site_primary_links_destination_type" DEFAULT 'internal-path',
  	"internal_path" varchar,
  	"external_url" varchar,
  	"document_id" integer,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "site_navigation_groups_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"destination_type" "enum_site_navigation_groups_links_destination_type" DEFAULT 'internal-path',
  	"internal_path" varchar,
  	"external_url" varchar,
  	"document_id" integer,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "site_navigation_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "site_announcements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" varchar,
  	"destination_type" "enum_site_announcements_destination_type" DEFAULT 'none',
  	"internal_path" varchar,
  	"external_url" varchar,
  	"document_id" integer,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "site_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"destination_type" "enum_site_footer_links_destination_type" DEFAULT 'internal-path',
  	"internal_path" varchar,
  	"external_url" varchar,
  	"document_id" integer,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "site" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"institute_name" varchar,
  	"logo_id" integer,
  	"legacy_logo_url" varchar,
  	"affiliation_summary" varchar,
  	"address" varchar,
  	"footer_text" varchar,
  	"review_status" "enum_site_review_status" DEFAULT 'unreviewed',
  	"source_url" varchar,
  	"source_snapshot_file" varchar,
  	"_status" "enum_site_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_site_v_version_contact_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_v_version_utility_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"destination_type" "enum__site_v_version_utility_links_destination_type" DEFAULT 'internal-path',
  	"internal_path" varchar,
  	"external_url" varchar,
  	"document_id" integer,
  	"open_in_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_v_version_primary_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"destination_type" "enum__site_v_version_primary_links_destination_type" DEFAULT 'internal-path',
  	"internal_path" varchar,
  	"external_url" varchar,
  	"document_id" integer,
  	"open_in_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_v_version_navigation_groups_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"destination_type" "enum__site_v_version_navigation_groups_links_destination_type" DEFAULT 'internal-path',
  	"internal_path" varchar,
  	"external_url" varchar,
  	"document_id" integer,
  	"open_in_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_v_version_navigation_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_v_version_announcements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"message" varchar,
  	"destination_type" "enum__site_v_version_announcements_destination_type" DEFAULT 'none',
  	"internal_path" varchar,
  	"external_url" varchar,
  	"document_id" integer,
  	"open_in_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_v_version_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"destination_type" "enum__site_v_version_footer_links_destination_type" DEFAULT 'internal-path',
  	"internal_path" varchar,
  	"external_url" varchar,
  	"document_id" integer,
  	"open_in_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_institute_name" varchar,
  	"version_logo_id" integer,
  	"version_legacy_logo_url" varchar,
  	"version_affiliation_summary" varchar,
  	"version_address" varchar,
  	"version_footer_text" varchar,
  	"version_review_status" "enum__site_v_version_review_status" DEFAULT 'unreviewed',
  	"version_source_url" varchar,
  	"version_source_snapshot_file" varchar,
  	"version__status" "enum__site_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "home_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"caption" varchar,
  	"image_id" integer,
  	"legacy_image_url" varchar,
  	"destination_type" "enum_home_hero_slides_destination_type" DEFAULT 'none',
  	"internal_path" varchar,
  	"external_url" varchar,
  	"document_id" integer,
  	"open_in_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "home_update_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"update_type" "enum_home_update_sections_update_type",
  	"selection_mode" "enum_home_update_sections_selection_mode" DEFAULT 'latest',
  	"item_limit" numeric DEFAULT 5,
  	"view_all_path" varchar
  );
  
  CREATE TABLE "home_campus_tour_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"caption" varchar,
  	"image_id" integer,
  	"legacy_image_url" varchar
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"campus_tour_heading" varchar,
  	"campus_tour_video_url" varchar,
  	"review_status" "enum_home_review_status" DEFAULT 'unreviewed',
  	"source_url" varchar,
  	"source_snapshot_file" varchar,
  	"_status" "enum_home_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"updates_id" integer
  );
  
  CREATE TABLE "_home_v_version_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"caption" varchar,
  	"image_id" integer,
  	"legacy_image_url" varchar,
  	"destination_type" "enum__home_v_version_hero_slides_destination_type" DEFAULT 'none',
  	"internal_path" varchar,
  	"external_url" varchar,
  	"document_id" integer,
  	"open_in_new_tab" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_update_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"update_type" "enum__home_v_version_update_sections_update_type",
  	"selection_mode" "enum__home_v_version_update_sections_selection_mode" DEFAULT 'latest',
  	"item_limit" numeric DEFAULT 5,
  	"view_all_path" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_campus_tour_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"caption" varchar,
  	"image_id" integer,
  	"legacy_image_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_heading" varchar,
  	"version_campus_tour_heading" varchar,
  	"version_campus_tour_video_url" varchar,
  	"version_review_status" "enum__home_v_version_review_status" DEFAULT 'unreviewed',
  	"version_source_url" varchar,
  	"version_source_snapshot_file" varchar,
  	"version__status" "enum__home_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_home_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"updates_id" integer
  );
  
  ALTER TABLE "site_contact_lines" ADD CONSTRAINT "site_contact_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_utility_links" ADD CONSTRAINT "site_utility_links_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_utility_links" ADD CONSTRAINT "site_utility_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_primary_links" ADD CONSTRAINT "site_primary_links_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_primary_links" ADD CONSTRAINT "site_primary_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_navigation_groups_links" ADD CONSTRAINT "site_navigation_groups_links_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_navigation_groups_links" ADD CONSTRAINT "site_navigation_groups_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_navigation_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_navigation_groups" ADD CONSTRAINT "site_navigation_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_announcements" ADD CONSTRAINT "site_announcements_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_announcements" ADD CONSTRAINT "site_announcements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_footer_links" ADD CONSTRAINT "site_footer_links_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_footer_links" ADD CONSTRAINT "site_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site" ADD CONSTRAINT "site_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_v_version_contact_lines" ADD CONSTRAINT "_site_v_version_contact_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_v_version_utility_links" ADD CONSTRAINT "_site_v_version_utility_links_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_v_version_utility_links" ADD CONSTRAINT "_site_v_version_utility_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_v_version_primary_links" ADD CONSTRAINT "_site_v_version_primary_links_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_v_version_primary_links" ADD CONSTRAINT "_site_v_version_primary_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_v_version_navigation_groups_links" ADD CONSTRAINT "_site_v_version_navigation_groups_links_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_v_version_navigation_groups_links" ADD CONSTRAINT "_site_v_version_navigation_groups_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_v_version_navigation_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_v_version_navigation_groups" ADD CONSTRAINT "_site_v_version_navigation_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_v_version_announcements" ADD CONSTRAINT "_site_v_version_announcements_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_v_version_announcements" ADD CONSTRAINT "_site_v_version_announcements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_v_version_footer_links" ADD CONSTRAINT "_site_v_version_footer_links_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_v_version_footer_links" ADD CONSTRAINT "_site_v_version_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_v" ADD CONSTRAINT "_site_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_hero_slides" ADD CONSTRAINT "home_hero_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_hero_slides" ADD CONSTRAINT "home_hero_slides_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_hero_slides" ADD CONSTRAINT "home_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_update_sections" ADD CONSTRAINT "home_update_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_campus_tour_gallery" ADD CONSTRAINT "home_campus_tour_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_campus_tour_gallery" ADD CONSTRAINT "home_campus_tour_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_updates_fk" FOREIGN KEY ("updates_id") REFERENCES "public"."updates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_hero_slides" ADD CONSTRAINT "_home_v_version_hero_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_version_hero_slides" ADD CONSTRAINT "_home_v_version_hero_slides_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_version_hero_slides" ADD CONSTRAINT "_home_v_version_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_update_sections" ADD CONSTRAINT "_home_v_version_update_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_campus_tour_gallery" ADD CONSTRAINT "_home_v_version_campus_tour_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_version_campus_tour_gallery" ADD CONSTRAINT "_home_v_version_campus_tour_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_rels" ADD CONSTRAINT "_home_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_rels" ADD CONSTRAINT "_home_v_rels_updates_fk" FOREIGN KEY ("updates_id") REFERENCES "public"."updates"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "site_contact_lines_order_idx" ON "site_contact_lines" USING btree ("_order");
  CREATE INDEX "site_contact_lines_parent_id_idx" ON "site_contact_lines" USING btree ("_parent_id");
  CREATE INDEX "site_utility_links_order_idx" ON "site_utility_links" USING btree ("_order");
  CREATE INDEX "site_utility_links_parent_id_idx" ON "site_utility_links" USING btree ("_parent_id");
  CREATE INDEX "site_utility_links_document_idx" ON "site_utility_links" USING btree ("document_id");
  CREATE INDEX "site_primary_links_order_idx" ON "site_primary_links" USING btree ("_order");
  CREATE INDEX "site_primary_links_parent_id_idx" ON "site_primary_links" USING btree ("_parent_id");
  CREATE INDEX "site_primary_links_document_idx" ON "site_primary_links" USING btree ("document_id");
  CREATE INDEX "site_navigation_groups_links_order_idx" ON "site_navigation_groups_links" USING btree ("_order");
  CREATE INDEX "site_navigation_groups_links_parent_id_idx" ON "site_navigation_groups_links" USING btree ("_parent_id");
  CREATE INDEX "site_navigation_groups_links_document_idx" ON "site_navigation_groups_links" USING btree ("document_id");
  CREATE INDEX "site_navigation_groups_order_idx" ON "site_navigation_groups" USING btree ("_order");
  CREATE INDEX "site_navigation_groups_parent_id_idx" ON "site_navigation_groups" USING btree ("_parent_id");
  CREATE INDEX "site_announcements_order_idx" ON "site_announcements" USING btree ("_order");
  CREATE INDEX "site_announcements_parent_id_idx" ON "site_announcements" USING btree ("_parent_id");
  CREATE INDEX "site_announcements_document_idx" ON "site_announcements" USING btree ("document_id");
  CREATE INDEX "site_footer_links_order_idx" ON "site_footer_links" USING btree ("_order");
  CREATE INDEX "site_footer_links_parent_id_idx" ON "site_footer_links" USING btree ("_parent_id");
  CREATE INDEX "site_footer_links_document_idx" ON "site_footer_links" USING btree ("document_id");
  CREATE INDEX "site_logo_idx" ON "site" USING btree ("logo_id");
  CREATE INDEX "site__status_idx" ON "site" USING btree ("_status");
  CREATE INDEX "_site_v_version_contact_lines_order_idx" ON "_site_v_version_contact_lines" USING btree ("_order");
  CREATE INDEX "_site_v_version_contact_lines_parent_id_idx" ON "_site_v_version_contact_lines" USING btree ("_parent_id");
  CREATE INDEX "_site_v_version_utility_links_order_idx" ON "_site_v_version_utility_links" USING btree ("_order");
  CREATE INDEX "_site_v_version_utility_links_parent_id_idx" ON "_site_v_version_utility_links" USING btree ("_parent_id");
  CREATE INDEX "_site_v_version_utility_links_document_idx" ON "_site_v_version_utility_links" USING btree ("document_id");
  CREATE INDEX "_site_v_version_primary_links_order_idx" ON "_site_v_version_primary_links" USING btree ("_order");
  CREATE INDEX "_site_v_version_primary_links_parent_id_idx" ON "_site_v_version_primary_links" USING btree ("_parent_id");
  CREATE INDEX "_site_v_version_primary_links_document_idx" ON "_site_v_version_primary_links" USING btree ("document_id");
  CREATE INDEX "_site_v_version_navigation_groups_links_order_idx" ON "_site_v_version_navigation_groups_links" USING btree ("_order");
  CREATE INDEX "_site_v_version_navigation_groups_links_parent_id_idx" ON "_site_v_version_navigation_groups_links" USING btree ("_parent_id");
  CREATE INDEX "_site_v_version_navigation_groups_links_document_idx" ON "_site_v_version_navigation_groups_links" USING btree ("document_id");
  CREATE INDEX "_site_v_version_navigation_groups_order_idx" ON "_site_v_version_navigation_groups" USING btree ("_order");
  CREATE INDEX "_site_v_version_navigation_groups_parent_id_idx" ON "_site_v_version_navigation_groups" USING btree ("_parent_id");
  CREATE INDEX "_site_v_version_announcements_order_idx" ON "_site_v_version_announcements" USING btree ("_order");
  CREATE INDEX "_site_v_version_announcements_parent_id_idx" ON "_site_v_version_announcements" USING btree ("_parent_id");
  CREATE INDEX "_site_v_version_announcements_document_idx" ON "_site_v_version_announcements" USING btree ("document_id");
  CREATE INDEX "_site_v_version_footer_links_order_idx" ON "_site_v_version_footer_links" USING btree ("_order");
  CREATE INDEX "_site_v_version_footer_links_parent_id_idx" ON "_site_v_version_footer_links" USING btree ("_parent_id");
  CREATE INDEX "_site_v_version_footer_links_document_idx" ON "_site_v_version_footer_links" USING btree ("document_id");
  CREATE INDEX "_site_v_version_version_logo_idx" ON "_site_v" USING btree ("version_logo_id");
  CREATE INDEX "_site_v_version_version__status_idx" ON "_site_v" USING btree ("version__status");
  CREATE INDEX "_site_v_created_at_idx" ON "_site_v" USING btree ("created_at");
  CREATE INDEX "_site_v_updated_at_idx" ON "_site_v" USING btree ("updated_at");
  CREATE INDEX "_site_v_latest_idx" ON "_site_v" USING btree ("latest");
  CREATE INDEX "home_hero_slides_order_idx" ON "home_hero_slides" USING btree ("_order");
  CREATE INDEX "home_hero_slides_parent_id_idx" ON "home_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "home_hero_slides_image_idx" ON "home_hero_slides" USING btree ("image_id");
  CREATE INDEX "home_hero_slides_document_idx" ON "home_hero_slides" USING btree ("document_id");
  CREATE INDEX "home_update_sections_order_idx" ON "home_update_sections" USING btree ("_order");
  CREATE INDEX "home_update_sections_parent_id_idx" ON "home_update_sections" USING btree ("_parent_id");
  CREATE INDEX "home_campus_tour_gallery_order_idx" ON "home_campus_tour_gallery" USING btree ("_order");
  CREATE INDEX "home_campus_tour_gallery_parent_id_idx" ON "home_campus_tour_gallery" USING btree ("_parent_id");
  CREATE INDEX "home_campus_tour_gallery_image_idx" ON "home_campus_tour_gallery" USING btree ("image_id");
  CREATE INDEX "home__status_idx" ON "home" USING btree ("_status");
  CREATE INDEX "home_rels_order_idx" ON "home_rels" USING btree ("order");
  CREATE INDEX "home_rels_parent_idx" ON "home_rels" USING btree ("parent_id");
  CREATE INDEX "home_rels_path_idx" ON "home_rels" USING btree ("path");
  CREATE INDEX "home_rels_updates_id_idx" ON "home_rels" USING btree ("updates_id");
  CREATE INDEX "_home_v_version_hero_slides_order_idx" ON "_home_v_version_hero_slides" USING btree ("_order");
  CREATE INDEX "_home_v_version_hero_slides_parent_id_idx" ON "_home_v_version_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_hero_slides_image_idx" ON "_home_v_version_hero_slides" USING btree ("image_id");
  CREATE INDEX "_home_v_version_hero_slides_document_idx" ON "_home_v_version_hero_slides" USING btree ("document_id");
  CREATE INDEX "_home_v_version_update_sections_order_idx" ON "_home_v_version_update_sections" USING btree ("_order");
  CREATE INDEX "_home_v_version_update_sections_parent_id_idx" ON "_home_v_version_update_sections" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_campus_tour_gallery_order_idx" ON "_home_v_version_campus_tour_gallery" USING btree ("_order");
  CREATE INDEX "_home_v_version_campus_tour_gallery_parent_id_idx" ON "_home_v_version_campus_tour_gallery" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_campus_tour_gallery_image_idx" ON "_home_v_version_campus_tour_gallery" USING btree ("image_id");
  CREATE INDEX "_home_v_version_version__status_idx" ON "_home_v" USING btree ("version__status");
  CREATE INDEX "_home_v_created_at_idx" ON "_home_v" USING btree ("created_at");
  CREATE INDEX "_home_v_updated_at_idx" ON "_home_v" USING btree ("updated_at");
  CREATE INDEX "_home_v_latest_idx" ON "_home_v" USING btree ("latest");
  CREATE INDEX "_home_v_rels_order_idx" ON "_home_v_rels" USING btree ("order");
  CREATE INDEX "_home_v_rels_parent_idx" ON "_home_v_rels" USING btree ("parent_id");
  CREATE INDEX "_home_v_rels_path_idx" ON "_home_v_rels" USING btree ("path");
  CREATE INDEX "_home_v_rels_updates_id_idx" ON "_home_v_rels" USING btree ("updates_id");
  ALTER TABLE "media" DROP COLUMN "_objectkey";
  ALTER TABLE "documents" DROP COLUMN "_objectkey";
  ALTER TABLE "_documents_v" DROP COLUMN "version__objectkey";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "site_contact_lines" CASCADE;
  DROP TABLE "site_utility_links" CASCADE;
  DROP TABLE "site_primary_links" CASCADE;
  DROP TABLE "site_navigation_groups_links" CASCADE;
  DROP TABLE "site_navigation_groups" CASCADE;
  DROP TABLE "site_announcements" CASCADE;
  DROP TABLE "site_footer_links" CASCADE;
  DROP TABLE "site" CASCADE;
  DROP TABLE "_site_v_version_contact_lines" CASCADE;
  DROP TABLE "_site_v_version_utility_links" CASCADE;
  DROP TABLE "_site_v_version_primary_links" CASCADE;
  DROP TABLE "_site_v_version_navigation_groups_links" CASCADE;
  DROP TABLE "_site_v_version_navigation_groups" CASCADE;
  DROP TABLE "_site_v_version_announcements" CASCADE;
  DROP TABLE "_site_v_version_footer_links" CASCADE;
  DROP TABLE "_site_v" CASCADE;
  DROP TABLE "home_hero_slides" CASCADE;
  DROP TABLE "home_update_sections" CASCADE;
  DROP TABLE "home_campus_tour_gallery" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "home_rels" CASCADE;
  DROP TABLE "_home_v_version_hero_slides" CASCADE;
  DROP TABLE "_home_v_version_update_sections" CASCADE;
  DROP TABLE "_home_v_version_campus_tour_gallery" CASCADE;
  DROP TABLE "_home_v" CASCADE;
  DROP TABLE "_home_v_rels" CASCADE;
  ALTER TABLE "media" ADD COLUMN "_objectkey" varchar;
  ALTER TABLE "documents" ADD COLUMN "_objectkey" varchar;
  ALTER TABLE "_documents_v" ADD COLUMN "version__objectkey" varchar;
  DROP TYPE "public"."enum_site_utility_links_destination_type";
  DROP TYPE "public"."enum_site_primary_links_destination_type";
  DROP TYPE "public"."enum_site_navigation_groups_links_destination_type";
  DROP TYPE "public"."enum_site_announcements_destination_type";
  DROP TYPE "public"."enum_site_footer_links_destination_type";
  DROP TYPE "public"."enum_site_review_status";
  DROP TYPE "public"."enum_site_status";
  DROP TYPE "public"."enum__site_v_version_utility_links_destination_type";
  DROP TYPE "public"."enum__site_v_version_primary_links_destination_type";
  DROP TYPE "public"."enum__site_v_version_navigation_groups_links_destination_type";
  DROP TYPE "public"."enum__site_v_version_announcements_destination_type";
  DROP TYPE "public"."enum__site_v_version_footer_links_destination_type";
  DROP TYPE "public"."enum__site_v_version_review_status";
  DROP TYPE "public"."enum__site_v_version_status";
  DROP TYPE "public"."enum_home_hero_slides_destination_type";
  DROP TYPE "public"."enum_home_update_sections_update_type";
  DROP TYPE "public"."enum_home_update_sections_selection_mode";
  DROP TYPE "public"."enum_home_review_status";
  DROP TYPE "public"."enum_home_status";
  DROP TYPE "public"."enum__home_v_version_hero_slides_destination_type";
  DROP TYPE "public"."enum__home_v_version_update_sections_update_type";
  DROP TYPE "public"."enum__home_v_version_update_sections_selection_mode";
  DROP TYPE "public"."enum__home_v_version_review_status";
  DROP TYPE "public"."enum__home_v_version_status";`)
}
