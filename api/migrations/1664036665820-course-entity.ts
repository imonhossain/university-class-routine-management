import { MigrationInterface, QueryRunner } from 'typeorm';

export class CourseEntity1664036665820 implements MigrationInterface {
  name = 'courseEntity1664036665820';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create enum type for department
    await queryRunner.query(`CREATE TYPE "course_department_enum" AS ENUM ('CSE', 'EEE', 'ECE', 'TE')`);

    await queryRunner.query(
      `CREATE TABLE "course" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "code" varchar(50) NOT NULL,
        "name" text NOT NULL,
        "credit" integer NOT NULL,
        "department" "course_department_enum" NOT NULL,
        "semester" integer NOT NULL,
        "isAutoAssign" boolean NOT NULL DEFAULT true,
        CONSTRAINT "PK_course" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "course"`);
    await queryRunner.query(`DROP TYPE "course_department_enum"`);
  }
}
