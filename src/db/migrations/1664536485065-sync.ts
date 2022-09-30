import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1664536485065 implements MigrationInterface {
    name = 'sync1664536485065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "comments" DROP COLUMN "dateOfPost"
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ADD "dateOfPost" TIMESTAMP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "comments" DROP COLUMN "dateOfPost"
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ADD "dateOfPost" TIME NOT NULL
        `);
    }

}
