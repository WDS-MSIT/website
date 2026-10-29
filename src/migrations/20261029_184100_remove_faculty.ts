import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "faculty_qualifications" CASCADE;
  DROP TABLE "faculty" CASCADE;
  DROP TABLE "_faculty_v_version_qualifications" CASCADE;
  DROP TABLE "_faculty_v" CASCADE;
  DROP TYPE "public"."enum_faculty_status";
  DROP TYPE "public"."enum__faculty_v_version_status";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_faculty_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__faculty_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "faculty_qualifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"qualification" varchar
  );
  
  CREATE TABLE "faculty" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"slug" varchar,
  	"department_id" integer,
  	"designation" varchar,
  	"email" varchar,
  	"biography" varchar,
  	"photo_id" integer,
  	"detailed_profile_id" integer,
  	"vidwan_id" varchar,
  	"sort_order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_faculty_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_faculty_v_version_qualifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"qualification" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_faculty_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_slug" varchar,
  	"version_department_id" integer,
  	"version_designation" varchar,
  	"version_email" varchar,
  	"version_biography" varchar,
  	"version_photo_id" integer,
  	"version_detailed_profile_id" integer,
  	"version_vidwan_id" varchar,
  	"version_sort_order" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__faculty_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "faculty_qualifications" ADD CONSTRAINT "faculty_qualifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faculty"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faculty" ADD CONSTRAINT "faculty_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faculty" ADD CONSTRAINT "faculty_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faculty" ADD CONSTRAINT "faculty_detailed_profile_id_media_id_fk" FOREIGN KEY ("detailed_profile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_faculty_v_version_qualifications" ADD CONSTRAINT "_faculty_v_version_qualifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_faculty_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_faculty_v" ADD CONSTRAINT "_faculty_v_parent_id_faculty_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."faculty"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_faculty_v" ADD CONSTRAINT "_faculty_v_version_department_id_departments_id_fk" FOREIGN KEY ("version_department_id") REFERENCES "public"."departments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_faculty_v" ADD CONSTRAINT "_faculty_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_faculty_v" ADD CONSTRAINT "_faculty_v_version_detailed_profile_id_media_id_fk" FOREIGN KEY ("version_detailed_profile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "faculty_qualifications_order_idx" ON "faculty_qualifications" USING btree ("_order");
  CREATE INDEX "faculty_qualifications_parent_id_idx" ON "faculty_qualifications" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "faculty_slug_idx" ON "faculty" USING btree ("slug");
  CREATE INDEX "faculty_department_idx" ON "faculty" USING btree ("department_id");
  CREATE INDEX "faculty_photo_idx" ON "faculty" USING btree ("photo_id");
  CREATE INDEX "faculty_detailed_profile_idx" ON "faculty" USING btree ("detailed_profile_id");
  CREATE UNIQUE INDEX "faculty_vidwan_id_idx" ON "faculty" USING btree ("vidwan_id");
  CREATE INDEX "faculty_updated_at_idx" ON "faculty" USING btree ("updated_at");
  CREATE INDEX "faculty_created_at_idx" ON "faculty" USING btree ("created_at");
  CREATE INDEX "faculty__status_idx" ON "faculty" USING btree ("_status");
  CREATE INDEX "_faculty_v_version_qualifications_order_idx" ON "_faculty_v_version_qualifications" USING btree ("_order");
  CREATE INDEX "_faculty_v_version_qualifications_parent_id_idx" ON "_faculty_v_version_qualifications" USING btree ("_parent_id");
  CREATE INDEX "_faculty_v_parent_idx" ON "_faculty_v" USING btree ("parent_id");
  CREATE INDEX "_faculty_v_version_version_slug_idx" ON "_faculty_v" USING btree ("version_slug");
  CREATE INDEX "_faculty_v_version_version_department_idx" ON "_faculty_v" USING btree ("version_department_id");
  CREATE INDEX "_faculty_v_version_version_photo_idx" ON "_faculty_v" USING btree ("version_photo_id");
  CREATE INDEX "_faculty_v_version_version_detailed_profile_idx" ON "_faculty_v" USING btree ("version_detailed_profile_id");
  CREATE INDEX "_faculty_v_version_version_vidwan_id_idx" ON "_faculty_v" USING btree ("version_vidwan_id");
  CREATE INDEX "_faculty_v_version_version_updated_at_idx" ON "_faculty_v" USING btree ("version_updated_at");
  CREATE INDEX "_faculty_v_version_version_created_at_idx" ON "_faculty_v" USING btree ("version_created_at");
  CREATE INDEX "_faculty_v_version_version__status_idx" ON "_faculty_v" USING btree ("version__status");
  CREATE INDEX "_faculty_v_created_at_idx" ON "_faculty_v" USING btree ("created_at");
  CREATE INDEX "_faculty_v_updated_at_idx" ON "_faculty_v" USING btree ("updated_at");
  CREATE INDEX "_faculty_v_latest_idx" ON "_faculty_v" USING btree ("latest");`)
}
