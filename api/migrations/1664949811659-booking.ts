import { MigrationInterface, QueryRunner } from 'typeorm';

export class Booking1664949811659 implements MigrationInterface {
  name = 'booking1664949811659';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`Booking\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`registerStudent\` int NOT NULL, \`semester\` int NOT NULL, \`section\` enum ('A', 'B') NOT NULL, \`courseId\` varchar(255) NOT NULL, \`teacherId\` varchar(255) NOT NULL, \`roomId\` varchar(255) NOT NULL, \`timeSlotId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`Booking\``);
  }
}
