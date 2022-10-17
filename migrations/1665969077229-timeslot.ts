import { MigrationInterface, QueryRunner } from 'typeorm';

export class Timeslot1665969077229 implements MigrationInterface {
  name = 'timeslot1665969077229';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`Timeslot\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`startTime\` varchar(255) NOT NULL, \`endTime\` varchar(255) NOT NULL, \`dayGroup\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`Timeslot\``);
  }
}
