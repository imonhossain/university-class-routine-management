import { MigrationInterface, QueryRunner } from 'typeorm';

export class Booking1664949811659 implements MigrationInterface {
  name = 'booking1664949811659';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create enum type for section
    await queryRunner.query(`CREATE TYPE "booking_section_enum" AS ENUM ('A', 'B')`);

    await queryRunner.query(
      `CREATE TABLE "booking" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "registerStudent" integer NOT NULL,
        "semester" integer NOT NULL,
        "section" "booking_section_enum" NOT NULL,
        "courseId" uuid NOT NULL,
        "teacherId" uuid NOT NULL,
        "roomId" uuid NOT NULL,
        "timeSlotId" varchar(255) NOT NULL,
        CONSTRAINT "PK_booking" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "booking"`);
    await queryRunner.query(`DROP TYPE "booking_section_enum"`);
  }
}
