import { MigrationInterface, QueryRunner } from "typeorm"

export class createDb1666005863689 implements MigrationInterface {
  name = 'createDb1666005863689'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "cart" (
        "id" SERIAL NOT NULL PRIMARY KEY,
        "count" integer,
      )
    `);
    }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "cart"
    `);
    }

}
