import type { MigrationInterface, QueryRunner } from 'typeorm';

export class sync1661771821194 implements MigrationInterface {
    name = 'sync1661771821194';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "fullName" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "dob" DROP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "dob"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "fullName"
            SET NOT NULL
        `);
    }
}
