import { MigrationInterface, QueryRunner } from "typeorm";

export class LibMigrations1717483068098 implements MigrationInterface {
    name = 'LibMigrations1717483068098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_book" DROP CONSTRAINT "FK_4077a975d25c90310520de0b90f"`);
        await queryRunner.query(`ALTER TABLE "user_book" ADD CONSTRAINT "FK_4077a975d25c90310520de0b90f" FOREIGN KEY ("booknameID") REFERENCES "book"("ID") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_book" DROP CONSTRAINT "FK_4077a975d25c90310520de0b90f"`);
        await queryRunner.query(`ALTER TABLE "user_book" ADD CONSTRAINT "FK_4077a975d25c90310520de0b90f" FOREIGN KEY ("booknameID") REFERENCES "book"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
