import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1749729463301 implements MigrationInterface {
    name = 'Init1749729463301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bid" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "amount" numeric NOT NULL, "lotId" uuid, "userId" uuid, CONSTRAINT "PK_ed405dda320051aca2dcb1a50bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('buyer', 'seller', 'admin')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'buyer', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auctions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "publishedAt" TIMESTAMP, "title" character varying NOT NULL, "slug" character varying NOT NULL, "description" text, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, "sellerId" uuid, CONSTRAINT "UQ_bbcfa642960043fa1e81a08aeda" UNIQUE ("slug"), CONSTRAINT "PK_87d2b34d4829f0519a5c5570368" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "auction_slug_index" ON "auctions" ("slug") `);
        await queryRunner.query(`CREATE TABLE "lot_attribute_values" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "value" character varying NOT NULL, "lotId" uuid, "attributeId" uuid, CONSTRAINT "PK_69d165e59aad39395d4e9b2d401" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lots" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "publishedAt" TIMESTAMP, "title" character varying NOT NULL, "description" text NOT NULL, "slug" character varying NOT NULL, "startPrice" numeric NOT NULL, "auctionId" uuid, "categoryId" uuid, CONSTRAINT "UQ_2a25e990d77023b013e633b9ca8" UNIQUE ("slug"), CONSTRAINT "PK_2bb990a4015865cb1daa1d22fd9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "lot_slug_index" ON "lots" ("slug") `);
        await queryRunner.query(`CREATE INDEX "lot_auctionId_index" ON "lots" ("auctionId") `);
        await queryRunner.query(`CREATE INDEX "lot_categoryId_index" ON "lots" ("categoryId") `);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "slug" character varying NOT NULL, "parentId" uuid, CONSTRAINT "UQ_420d9f679d41281f282f5bc7d09" UNIQUE ("slug"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_420d9f679d41281f282f5bc7d0" ON "categories" ("slug") `);
        await queryRunner.query(`CREATE TABLE "attributes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_32216e2e61830211d3a5d7fa72c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories_attributes_attributes" ("categoriesId" uuid NOT NULL, "attributesId" uuid NOT NULL, CONSTRAINT "PK_a148dc49f421d68f71a511ca405" PRIMARY KEY ("categoriesId", "attributesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2220bb05da09f0248535338b3f" ON "categories_attributes_attributes" ("categoriesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7ae8656808cbd8d1e54e63765f" ON "categories_attributes_attributes" ("attributesId") `);
        await queryRunner.query(`ALTER TABLE "bid" ADD CONSTRAINT "FK_03de8f257efea9dc91146efd786" FOREIGN KEY ("lotId") REFERENCES "lots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bid" ADD CONSTRAINT "FK_b0f254bd6d29d3da2b6a8af262b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auctions" ADD CONSTRAINT "FK_7562985483a1d83d0790b19d186" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lot_attribute_values" ADD CONSTRAINT "FK_c2a2565b7bf424c75f2bd7fa583" FOREIGN KEY ("lotId") REFERENCES "lots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lot_attribute_values" ADD CONSTRAINT "FK_bd9f2dcd083be041be652462d39" FOREIGN KEY ("attributeId") REFERENCES "attributes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lots" ADD CONSTRAINT "FK_e196e667239da7aaf65825beaec" FOREIGN KEY ("auctionId") REFERENCES "auctions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "lots" ADD CONSTRAINT "FK_d79553fc949cf1a00bd539e2a6f" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_9a6f051e66982b5f0318981bcaa" FOREIGN KEY ("parentId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories_attributes_attributes" ADD CONSTRAINT "FK_2220bb05da09f0248535338b3fc" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "categories_attributes_attributes" ADD CONSTRAINT "FK_7ae8656808cbd8d1e54e63765fd" FOREIGN KEY ("attributesId") REFERENCES "attributes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories_attributes_attributes" DROP CONSTRAINT "FK_7ae8656808cbd8d1e54e63765fd"`);
        await queryRunner.query(`ALTER TABLE "categories_attributes_attributes" DROP CONSTRAINT "FK_2220bb05da09f0248535338b3fc"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_9a6f051e66982b5f0318981bcaa"`);
        await queryRunner.query(`ALTER TABLE "lots" DROP CONSTRAINT "FK_d79553fc949cf1a00bd539e2a6f"`);
        await queryRunner.query(`ALTER TABLE "lots" DROP CONSTRAINT "FK_e196e667239da7aaf65825beaec"`);
        await queryRunner.query(`ALTER TABLE "lot_attribute_values" DROP CONSTRAINT "FK_bd9f2dcd083be041be652462d39"`);
        await queryRunner.query(`ALTER TABLE "lot_attribute_values" DROP CONSTRAINT "FK_c2a2565b7bf424c75f2bd7fa583"`);
        await queryRunner.query(`ALTER TABLE "auctions" DROP CONSTRAINT "FK_7562985483a1d83d0790b19d186"`);
        await queryRunner.query(`ALTER TABLE "bid" DROP CONSTRAINT "FK_b0f254bd6d29d3da2b6a8af262b"`);
        await queryRunner.query(`ALTER TABLE "bid" DROP CONSTRAINT "FK_03de8f257efea9dc91146efd786"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7ae8656808cbd8d1e54e63765f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2220bb05da09f0248535338b3f"`);
        await queryRunner.query(`DROP TABLE "categories_attributes_attributes"`);
        await queryRunner.query(`DROP TABLE "attributes"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_420d9f679d41281f282f5bc7d0"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP INDEX "public"."lot_categoryId_index"`);
        await queryRunner.query(`DROP INDEX "public"."lot_auctionId_index"`);
        await queryRunner.query(`DROP INDEX "public"."lot_slug_index"`);
        await queryRunner.query(`DROP TABLE "lots"`);
        await queryRunner.query(`DROP TABLE "lot_attribute_values"`);
        await queryRunner.query(`DROP INDEX "public"."auction_slug_index"`);
        await queryRunner.query(`DROP TABLE "auctions"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "bid"`);
    }

}
