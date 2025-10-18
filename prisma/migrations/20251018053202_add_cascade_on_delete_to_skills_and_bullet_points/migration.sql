-- DropForeignKey
ALTER TABLE "public"."bullet_points" DROP CONSTRAINT "bullet_points_experience_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."experiences_skills" DROP CONSTRAINT "experiences_skills_experience_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."experiences_skills" DROP CONSTRAINT "experiences_skills_skill_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."project_skills" DROP CONSTRAINT "project_skills_project_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."project_skills" DROP CONSTRAINT "project_skills_skill_id_fkey";

-- AddForeignKey
ALTER TABLE "bullet_points" ADD CONSTRAINT "bullet_points_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "experiences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiences_skills" ADD CONSTRAINT "experiences_skills_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "experiences"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiences_skills" ADD CONSTRAINT "experiences_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_skills" ADD CONSTRAINT "project_skills_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_skills" ADD CONSTRAINT "project_skills_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;
