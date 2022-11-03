/* eslint-disable class-methods-use-this */
import type { MigrationInterface, QueryRunner } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/naming-convention
export class createDb1666429287341 implements MigrationInterface {
  name = 'createDb1666429287341';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "rating" (
        "id" SERIAL NOT NULL PRIMARY KEY,
        "rating" integer,
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "comment" (
        "id" SERIAL NOT NULL PRIMARY KEY,
        "comment" text,
        "commentData" date,
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "comment"
    `);
    await queryRunner.query(`
      DROP TABLE "rating"
    `);
  }
}
