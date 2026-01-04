import { MigrationInterface, QueryRunner } from 'typeorm';

export class Timeslot1665969077229 implements MigrationInterface {
  name = 'timeslot1665969077229';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "timeslot" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "startTime" varchar(255) NOT NULL,
        "endTime" varchar(255) NOT NULL,
        "dayGroup" integer NOT NULL,
        CONSTRAINT "PK_timeslot" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "timeslot"`);
  }
}
