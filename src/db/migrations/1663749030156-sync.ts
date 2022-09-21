import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1663749030156 implements MigrationInterface {
    name = 'sync1663749030156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "books" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "author" character varying NOT NULL,
                "description" character varying,
                "rating" real,
                "cover" character varying,
                "image" character varying,
                "price" real NOT NULL,
                "dateOfIssue" date,
                CONSTRAINT "UQ_4675aad2c57a7a793d26afbae99" UNIQUE ("author"),
                CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "books"
        `);
    }

}
