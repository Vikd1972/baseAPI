/* eslint-disable class-methods-use-this */
import type { MigrationInterface, QueryRunner } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/naming-convention
export class createDb1665585875360 implements MigrationInterface {
  name = 'createDb1665585875360';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "genre" (
        "id" SERIAL NOT NULL PRIMARY KEY,
        "name" character varying
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "book" (
        "id" SERIAL NOT NULL PRIMARY KEY,
        "name" character varying,
        "author" character varying,
        "pathToCover" character varying,
        "description" text,
        "relisedAt" date,
        "paperbackPrice" integer,
        "paperbackQuantity" integer,
        "hardcoverPrice" integer,
        "hardcoverQuantity" integer,
        "isNew" boolean,
        "isBestseller" boolean
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "assessment" (
        "id" SERIAL NOT NULL PRIMARY KEY,
        "rating" integer,
        "comment" text,
        "commentData" date
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "assessment"
    `);
    await queryRunner.query(`
      DROP TABLE "book"
    `);
    await queryRunner.query(`
      DROP TABLE "genre"
    `);
  }
}
