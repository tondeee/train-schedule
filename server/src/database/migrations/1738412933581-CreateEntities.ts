import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEntities1738412933581 implements MigrationInterface {
  name = 'CreateEntities1738412933581';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`,
    );
    await queryRunner.query(
      `CREATE TABLE "train" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "scheduleDays" integer NOT NULL DEFAULT '127', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "routeId" integer, CONSTRAINT "PK_0590a6e4276dfef1c8ba49f1c08" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "route" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_08affcd076e46415e5821acf52d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "station" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "location" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cad1b3e7182ef8df1057b82f6aa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "stops" ("id" SERIAL NOT NULL, "arrivalTime" TIME NOT NULL, "departureTime" TIME NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "route_id" integer, "station_id" integer, CONSTRAINT "PK_ed1be877403ad3c921b07f62ca5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "REL_75e2be4ce11d447ef43be0e374"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photoId"`);
    await queryRunner.query(
      `ALTER TABLE "train" ADD CONSTRAINT "FK_eff22ca4eed61ecf908b27f435a" FOREIGN KEY ("routeId") REFERENCES "route"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stops" ADD CONSTRAINT "FK_dbc2394dc0bac04d772498dc503" FOREIGN KEY ("route_id") REFERENCES "route"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "stops" ADD CONSTRAINT "FK_0a94033fa3e23aaf0f7700eeb05" FOREIGN KEY ("station_id") REFERENCES "station"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "stops" DROP CONSTRAINT "FK_0a94033fa3e23aaf0f7700eeb05"`,
    );
    await queryRunner.query(
      `ALTER TABLE "stops" DROP CONSTRAINT "FK_dbc2394dc0bac04d772498dc503"`,
    );
    await queryRunner.query(
      `ALTER TABLE "train" DROP CONSTRAINT "FK_eff22ca4eed61ecf908b27f435a"`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "photoId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "REL_75e2be4ce11d447ef43be0e374" UNIQUE ("photoId")`,
    );
    await queryRunner.query(`DROP TABLE "stops"`);
    await queryRunner.query(`DROP TABLE "station"`);
    await queryRunner.query(`DROP TABLE "route"`);
    await queryRunner.query(`DROP TABLE "train"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
