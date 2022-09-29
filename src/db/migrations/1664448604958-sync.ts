import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1664448604958 implements MigrationInterface {
    name = 'sync1664448604958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "books"
            ALTER COLUMN "rating"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "books"
            ALTER COLUMN "rating"
            SET DEFAULT '1'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "books"
            ALTER COLUMN "rating" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "books"
            ALTER COLUMN "rating" DROP NOT NULL
        `);
    }

}
