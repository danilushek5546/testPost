import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1664523566284 implements MigrationInterface {
    name = 'sync1664523566284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "comments"
            ADD "dateOfPost" date NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "comments" DROP COLUMN "dateOfPost"
        `);
    }

}
