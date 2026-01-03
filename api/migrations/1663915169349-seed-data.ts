import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class SeedData1663915169349 implements MigrationInterface {
  name = 'seedData1663915169349';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const hashedPassword = await bcrypt.hash('admin', 10);

    await queryRunner.query(
      `INSERT INTO "user" ("name", "username", "email", "role", "status", "password")
       VALUES ('NUB Admin', 'admin', 'admin@gmail.com', 'ADMIN', 'ACTIVE', $1)`,
      [hashedPassword],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "user" WHERE "email" = 'admin@gmail.com'`);
  }
}
