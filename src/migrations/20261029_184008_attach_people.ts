import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "committees_members" ADD COLUMN "person_id" integer;
  ALTER TABLE "_committees_v_version_members" ADD COLUMN "person_id" integer;
  ALTER TABLE "societies_faculty_coordinators" ADD COLUMN "person_id" integer;
  ALTER TABLE "societies_student_leaders" ADD COLUMN "person_id" integer;
  ALTER TABLE "_societies_v_version_faculty_coordinators" ADD COLUMN "person_id" integer;
  ALTER TABLE "_societies_v_version_student_leaders" ADD COLUMN "person_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "people_id" integer;
  ALTER TABLE "committees_members" ADD CONSTRAINT "committees_members_person_id_people_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_committees_v_version_members" ADD CONSTRAINT "_committees_v_version_members_person_id_people_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "societies_faculty_coordinators" ADD CONSTRAINT "societies_faculty_coordinators_person_id_people_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "societies_student_leaders" ADD CONSTRAINT "societies_student_leaders_person_id_people_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_societies_v_version_faculty_coordinators" ADD CONSTRAINT "_societies_v_version_faculty_coordinators_person_id_people_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_societies_v_version_student_leaders" ADD CONSTRAINT "_societies_v_version_student_leaders_person_id_people_id_fk" FOREIGN KEY ("person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "committees_members_person_idx" ON "committees_members" USING btree ("person_id");
  CREATE INDEX "_committees_v_version_members_person_idx" ON "_committees_v_version_members" USING btree ("person_id");
  CREATE INDEX "societies_faculty_coordinators_person_idx" ON "societies_faculty_coordinators" USING btree ("person_id");
  CREATE INDEX "societies_student_leaders_person_idx" ON "societies_student_leaders" USING btree ("person_id");
  CREATE INDEX "_societies_v_version_faculty_coordinators_person_idx" ON "_societies_v_version_faculty_coordinators" USING btree ("person_id");
  CREATE INDEX "_societies_v_version_student_leaders_person_idx" ON "_societies_v_version_student_leaders" USING btree ("person_id");
  CREATE INDEX "payload_locked_documents_rels_people_id_idx" ON "payload_locked_documents_rels" USING btree ("people_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "committees_members" DROP CONSTRAINT "committees_members_person_id_people_id_fk";
  
  ALTER TABLE "_committees_v_version_members" DROP CONSTRAINT "_committees_v_version_members_person_id_people_id_fk";
  
  ALTER TABLE "societies_faculty_coordinators" DROP CONSTRAINT "societies_faculty_coordinators_person_id_people_id_fk";
  
  ALTER TABLE "societies_student_leaders" DROP CONSTRAINT "societies_student_leaders_person_id_people_id_fk";
  
  ALTER TABLE "_societies_v_version_faculty_coordinators" DROP CONSTRAINT "_societies_v_version_faculty_coordinators_person_id_people_id_fk";
  
  ALTER TABLE "_societies_v_version_student_leaders" DROP CONSTRAINT "_societies_v_version_student_leaders_person_id_people_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_people_fk";
  
  DROP INDEX "committees_members_person_idx";
  DROP INDEX "_committees_v_version_members_person_idx";
  DROP INDEX "societies_faculty_coordinators_person_idx";
  DROP INDEX "societies_student_leaders_person_idx";
  DROP INDEX "_societies_v_version_faculty_coordinators_person_idx";
  DROP INDEX "_societies_v_version_student_leaders_person_idx";
  DROP INDEX "payload_locked_documents_rels_people_id_idx";
  ALTER TABLE "committees_members" DROP COLUMN "person_id";
  ALTER TABLE "_committees_v_version_members" DROP COLUMN "person_id";
  ALTER TABLE "societies_faculty_coordinators" DROP COLUMN "person_id";
  ALTER TABLE "societies_student_leaders" DROP COLUMN "person_id";
  ALTER TABLE "_societies_v_version_faculty_coordinators" DROP COLUMN "person_id";
  ALTER TABLE "_societies_v_version_student_leaders" DROP COLUMN "person_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "people_id";`)
}
