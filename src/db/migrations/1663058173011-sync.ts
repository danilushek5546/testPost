import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1663058173011 implements MigrationInterface {
    name = 'sync1663058173011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
                RENAME COLUMN "image" TO "photo"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
                RENAME COLUMN "photo" TO "image"
        `);
    }

}
