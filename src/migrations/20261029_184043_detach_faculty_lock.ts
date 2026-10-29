import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_faculty_fk";
  
  DROP INDEX "payload_locked_documents_rels_faculty_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "faculty_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "faculty_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faculty_fk" FOREIGN KEY ("faculty_id") REFERENCES "public"."faculty"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_faculty_id_idx" ON "payload_locked_documents_rels" USING btree ("faculty_id");`)
}
