import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1664536251437 implements MigrationInterface {
    name = 'sync1664536251437'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "comments" DROP COLUMN "dateOfPost"
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ADD "dateOfPost" TIME NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "comments" DROP COLUMN "dateOfPost"
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ADD "dateOfPost" date NOT NULL
        `);
    }

}
