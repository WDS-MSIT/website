import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_committees_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__committees_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "committees_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"designation" varchar,
  	"committee_role" varchar,
  	"phone" varchar,
  	"email" varchar
  );
  
  CREATE TABLE "committees_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "committees" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"source_url" varchar,
  	"source_snapshot_file" varchar,
  	"legacy_path" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_committees_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_committees_v_version_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"designation" varchar,
  	"committee_role" varchar,
  	"phone" varchar,
  	"email" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_committees_v_version_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_committees_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_source_url" varchar,
  	"version_source_snapshot_file" varchar,
  	"version_legacy_path" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__committees_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "committees_id" integer;
  ALTER TABLE "committees_members" ADD CONSTRAINT "committees_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."committees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "committees_links" ADD CONSTRAINT "committees_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."committees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_committees_v_version_members" ADD CONSTRAINT "_committees_v_version_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_committees_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_committees_v_version_links" ADD CONSTRAINT "_committees_v_version_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_committees_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_committees_v" ADD CONSTRAINT "_committees_v_parent_id_committees_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."committees"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "committees_members_order_idx" ON "committees_members" USING btree ("_order");
  CREATE INDEX "committees_members_parent_id_idx" ON "committees_members" USING btree ("_parent_id");
  CREATE INDEX "committees_links_order_idx" ON "committees_links" USING btree ("_order");
  CREATE INDEX "committees_links_parent_id_idx" ON "committees_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "committees_slug_idx" ON "committees" USING btree ("slug");
  CREATE INDEX "committees_legacy_path_idx" ON "committees" USING btree ("legacy_path");
  CREATE INDEX "committees_updated_at_idx" ON "committees" USING btree ("updated_at");
  CREATE INDEX "committees_created_at_idx" ON "committees" USING btree ("created_at");
  CREATE INDEX "committees__status_idx" ON "committees" USING btree ("_status");
  CREATE INDEX "_committees_v_version_members_order_idx" ON "_committees_v_version_members" USING btree ("_order");
  CREATE INDEX "_committees_v_version_members_parent_id_idx" ON "_committees_v_version_members" USING btree ("_parent_id");
  CREATE INDEX "_committees_v_version_links_order_idx" ON "_committees_v_version_links" USING btree ("_order");
  CREATE INDEX "_committees_v_version_links_parent_id_idx" ON "_committees_v_version_links" USING btree ("_parent_id");
  CREATE INDEX "_committees_v_parent_idx" ON "_committees_v" USING btree ("parent_id");
  CREATE INDEX "_committees_v_version_version_slug_idx" ON "_committees_v" USING btree ("version_slug");
  CREATE INDEX "_committees_v_version_version_legacy_path_idx" ON "_committees_v" USING btree ("version_legacy_path");
  CREATE INDEX "_committees_v_version_version_updated_at_idx" ON "_committees_v" USING btree ("version_updated_at");
  CREATE INDEX "_committees_v_version_version_created_at_idx" ON "_committees_v" USING btree ("version_created_at");
  CREATE INDEX "_committees_v_version_version__status_idx" ON "_committees_v" USING btree ("version__status");
  CREATE INDEX "_committees_v_created_at_idx" ON "_committees_v" USING btree ("created_at");
  CREATE INDEX "_committees_v_updated_at_idx" ON "_committees_v" USING btree ("updated_at");
  CREATE INDEX "_committees_v_latest_idx" ON "_committees_v" USING btree ("latest");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_committees_fk" FOREIGN KEY ("committees_id") REFERENCES "public"."committees"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_committees_id_idx" ON "payload_locked_documents_rels" USING btree ("committees_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "committees_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "committees_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "committees" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_committees_v_version_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_committees_v_version_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_committees_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "committees_members" CASCADE;
  DROP TABLE "committees_links" CASCADE;
  DROP TABLE "committees" CASCADE;
  DROP TABLE "_committees_v_version_members" CASCADE;
  DROP TABLE "_committees_v_version_links" CASCADE;
  DROP TABLE "_committees_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_committees_fk";
  
  DROP INDEX "payload_locked_documents_rels_committees_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "committees_id";
  DROP TYPE "public"."enum_committees_status";
  DROP TYPE "public"."enum__committees_v_version_status";`)
}
