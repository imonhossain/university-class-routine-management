import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1663915082054 implements MigrationInterface {
  name = 'initial1663915082054';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create enum types
    await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM ('ADMIN', 'MANAGER')`);
    await queryRunner.query(`CREATE TYPE "user_status_enum" AS ENUM ('ACTIVE', 'INACTIVE')`);

    await queryRunner.query(
      `CREATE TABLE "user" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "name" varchar(255) NOT NULL,
        "email" varchar(320) NOT NULL,
        "username" varchar(255) NOT NULL,
        "role" "user_role_enum" NOT NULL DEFAULT 'ADMIN',
        "status" "user_status_enum" NOT NULL DEFAULT 'ACTIVE',
        "password" text NOT NULL,
        CONSTRAINT "UQ_user_email" UNIQUE ("email"),
        CONSTRAINT "PK_user" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "user_status_enum"`);
    await queryRunner.query(`DROP TYPE "user_role_enum"`);
  }
}
