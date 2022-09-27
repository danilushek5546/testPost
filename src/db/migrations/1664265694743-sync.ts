import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1664265694743 implements MigrationInterface {
    name = 'sync1664265694743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart"
            ADD "count" integer NOT NULL DEFAULT '1'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart" DROP COLUMN "count"
        `);
    }

}
