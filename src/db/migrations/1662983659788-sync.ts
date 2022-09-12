import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1662983659788 implements MigrationInterface {
    name = 'sync1662983659788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "image" character varying
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "image"
        `);
    }

}
