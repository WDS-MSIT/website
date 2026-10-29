import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "societies_faculty_coordinators" DROP CONSTRAINT "societies_faculty_coordinators_faculty_id_faculty_id_fk";
  
  ALTER TABLE "_societies_v_version_faculty_coordinators" DROP CONSTRAINT "_societies_v_version_faculty_coordinators_faculty_id_faculty_id_fk";
  
  DROP INDEX "societies_faculty_coordinators_faculty_idx";
  DROP INDEX "_societies_v_version_faculty_coordinators_faculty_idx";
  ALTER TABLE "societies_faculty_coordinators" DROP COLUMN "faculty_id";
  ALTER TABLE "_societies_v_version_faculty_coordinators" DROP COLUMN "faculty_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "societies_faculty_coordinators" ADD COLUMN "faculty_id" integer;
  ALTER TABLE "_societies_v_version_faculty_coordinators" ADD COLUMN "faculty_id" integer;
  ALTER TABLE "societies_faculty_coordinators" ADD CONSTRAINT "societies_faculty_coordinators_faculty_id_faculty_id_fk" FOREIGN KEY ("faculty_id") REFERENCES "public"."faculty"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_societies_v_version_faculty_coordinators" ADD CONSTRAINT "_societies_v_version_faculty_coordinators_faculty_id_faculty_id_fk" FOREIGN KEY ("faculty_id") REFERENCES "public"."faculty"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "societies_faculty_coordinators_faculty_idx" ON "societies_faculty_coordinators" USING btree ("faculty_id");
  CREATE INDEX "_societies_v_version_faculty_coordinators_faculty_idx" ON "_societies_v_version_faculty_coordinators" USING btree ("faculty_id");`)
}
