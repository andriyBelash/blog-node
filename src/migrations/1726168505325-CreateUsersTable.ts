import { MigrationInterface, QueryRunner, Table } from "typeorm";
import * as bcrypt from "bcrypt";

export class CreateUsersTable1631234567890 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "username",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "password",
                        type: "varchar",
                    },
                    {
                        name: 'picture_url',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: "role",
                        type: "enum",
                        enum: ["user", "admin"],
                        default: "'user'",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true
        );

        const hashedPassword = await bcrypt.hash("password", 10);

        await queryRunner.query(`
            INSERT INTO users (username, email, password, picture_url, role)
            VALUES ('admin', 'admin@mail.com', '${hashedPassword}', NULL, 'admin')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }
}