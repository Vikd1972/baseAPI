import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddField implements MigrationInterface {    

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "user_db",
            new TableColumn({
                name: "gender",
                type: "string",
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("user_db", "gender")
    }
}
