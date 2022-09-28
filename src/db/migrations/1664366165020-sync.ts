import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1664366165020 implements MigrationInterface {
    name = 'sync1664366165020'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "rating" DROP CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62"
        `);
        await queryRunner.query(`
            ALTER TABLE "rating" DROP CONSTRAINT "REL_a6c53dfc89ba3188b389ef29a6"
        `);
        await queryRunner.query(`
            ALTER TABLE "rating"
            ADD CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "rating" DROP CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62"
        `);
        await queryRunner.query(`
            ALTER TABLE "rating"
            ADD CONSTRAINT "REL_a6c53dfc89ba3188b389ef29a6" UNIQUE ("userId")
        `);
        await queryRunner.query(`
            ALTER TABLE "rating"
            ADD CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
