/* eslint-disable class-methods-use-this */
import type { MigrationInterface, QueryRunner } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/naming-convention
export class createDb1666011997529 implements MigrationInterface {
  name = 'createDb1666011997529';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" SERIAL NOT NULL PRIMARY KEY,
        "fullname" character varying,
        "email" character varying,
        "photoFilePath" character varying,
        "password"  character varying,
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "user"
    `);
  }
}
