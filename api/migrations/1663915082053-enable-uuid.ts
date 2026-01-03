import { MigrationInterface, QueryRunner } from 'typeorm';

export class EnableUuid1663915082053 implements MigrationInterface {
  name = 'enableUuid1663915082053';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp"`);
  }
}
