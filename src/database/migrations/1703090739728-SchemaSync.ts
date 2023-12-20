import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaSync1703090739728 implements MigrationInterface {
    name = 'SchemaSync1703090739728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" ADD "likes" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "likes"`);
    }

}
