import { MigrationInterface, QueryRunner } from 'typeorm';

export class RoomEntity1664893117772 implements MigrationInterface {
  name = 'roomEntity1664893117772';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "room" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "number" varchar(255) NOT NULL,
        "capacity" integer NOT NULL,
        "isAutoAssign" boolean NOT NULL DEFAULT true,
        CONSTRAINT "PK_room" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "room"`);
  }
}
