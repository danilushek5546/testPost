import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1664446128254 implements MigrationInterface {
    name = 'sync1664446128254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "favorite" (
                "id" SERIAL NOT NULL,
                "userId" integer NOT NULL,
                "bookId" integer,
                CONSTRAINT "PK_495675cec4fb09666704e4f610f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "favorite"
            ADD CONSTRAINT "FK_83b775fdebbe24c29b2b5831f2d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "favorite"
            ADD CONSTRAINT "FK_8051682e9969f260b6832449a0f" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "favorite" DROP CONSTRAINT "FK_8051682e9969f260b6832449a0f"
        `);
        await queryRunner.query(`
            ALTER TABLE "favorite" DROP CONSTRAINT "FK_83b775fdebbe24c29b2b5831f2d"
        `);
        await queryRunner.query(`
            DROP TABLE "favorite"
        `);
    }

}
