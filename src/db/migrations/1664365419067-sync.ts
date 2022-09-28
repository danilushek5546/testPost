import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1664365419067 implements MigrationInterface {
    name = 'sync1664365419067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "rating" (
                "id" SERIAL NOT NULL,
                "userId" integer NOT NULL,
                "bookId" integer NOT NULL,
                "rate" real,
                CONSTRAINT "REL_a6c53dfc89ba3188b389ef29a6" UNIQUE ("userId"),
                CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "rating"
            ADD CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "rating"
            ADD CONSTRAINT "FK_2ab7f7fc5b63b0147591ba69032" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "rating" DROP CONSTRAINT "FK_2ab7f7fc5b63b0147591ba69032"
        `);
        await queryRunner.query(`
            ALTER TABLE "rating" DROP CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62"
        `);
        await queryRunner.query(`
            DROP TABLE "rating"
        `);
    }

}
