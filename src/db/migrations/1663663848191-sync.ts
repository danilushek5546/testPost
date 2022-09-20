import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1663663848191 implements MigrationInterface {
    name = 'sync1663663848191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "generes" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "PK_621da8391f2b348d97d561eb5f5" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "generes"
        `);
    }

}
