import { MigrationInterface, QueryRunner } from 'typeorm';

export class CourseEntity1664036665820 implements MigrationInterface {
  name = 'courseEntity1664036665820';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`Course\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`code\` varchar(50) NOT NULL, \`name\` text NOT NULL, \`credit\` int NOT NULL, \`department\` enum ('CSE', 'EEE', 'ECE', 'TE') NOT NULL, \`semester\` int NOT NULL, \`isAutoAssign\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`Course\``);
  }
}
