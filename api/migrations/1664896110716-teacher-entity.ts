import { MigrationInterface, QueryRunner } from 'typeorm';

export class TeacherEntity1664896110716 implements MigrationInterface {
  name = 'teacherEntity1664896110716';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "teacher" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "name" varchar(255) NOT NULL,
        "phone" varchar(20) NOT NULL,
        "email" varchar(100) NOT NULL,
        CONSTRAINT "PK_teacher" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "teacher"`);
  }
}
