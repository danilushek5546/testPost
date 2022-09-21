import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1663761395047 implements MigrationInterface {
    name = 'sync1663761395047'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "books_generes_generes" (
                "booksId" integer NOT NULL,
                "generesId" integer NOT NULL,
                CONSTRAINT "PK_a454cec5aecfd681349c0f53a0c" PRIMARY KEY ("booksId", "generesId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_b790fc4ccca89d7d2e363d3581" ON "books_generes_generes" ("booksId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_fe4982cb78ddde710dfcbd1b9f" ON "books_generes_generes" ("generesId")
        `);
        await queryRunner.query(`
            ALTER TABLE "books_generes_generes"
            ADD CONSTRAINT "FK_b790fc4ccca89d7d2e363d35810" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "books_generes_generes"
            ADD CONSTRAINT "FK_fe4982cb78ddde710dfcbd1b9fb" FOREIGN KEY ("generesId") REFERENCES "generes"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "books_generes_generes" DROP CONSTRAINT "FK_fe4982cb78ddde710dfcbd1b9fb"
        `);
        await queryRunner.query(`
            ALTER TABLE "books_generes_generes" DROP CONSTRAINT "FK_b790fc4ccca89d7d2e363d35810"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_fe4982cb78ddde710dfcbd1b9f"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_b790fc4ccca89d7d2e363d3581"
        `);
        await queryRunner.query(`
            DROP TABLE "books_generes_generes"
        `);
    }

}
