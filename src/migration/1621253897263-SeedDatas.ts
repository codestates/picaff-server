import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { UserDataSeed } from "../seeds/user.seed";
import { ItemDataSeed } from "../seeds/item.seed";
import { CoffeeCharacterDataSeed } from "../seeds/coffeeCharacter.seed";
import { ProductCharacterDataSeed } from "../seeds/productCharacter.seed";
import { LikedDataSeed } from "../seeds/liked.seed";
import { TagDataSeed } from "../seeds/tag.seed";
import { TagItemDataSeed } from "../seeds/tagItem.seed";
import { TestResultDataSeed } from "../seeds/testResult.seed";
import { query } from "express";

export class SeedDatas1621253897263 implements MigrationInterface {
  name = "SeedDatas1621253897263";
  //   const queryRunner = connection.createQueryRunner(); DB셋업 마이그레이션쪽으로 빼는시도중
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getRepository("User").save(UserDataSeed);
    await getRepository("CoffeeCharacter").save(CoffeeCharacterDataSeed);
    await getRepository("ProductCharacter").save(ProductCharacterDataSeed);
    await getRepository("Tag").save(TagDataSeed);
    await getRepository("Item").save(ItemDataSeed);
    await getRepository("Liked").save(LikedDataSeed);
    await getRepository("TagItem").save(TagItemDataSeed);
    await getRepository("TestResult").save(TestResultDataSeed);
    await query;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE USER");
    await queryRunner.query("DROP TABLE ITEM");
    await queryRunner.query("DROP TABLE COFFEECHARACTER");
    await queryRunner.query("DROP TABLE LIKED");
    await queryRunner.query("DROP TABLE TAG");
    await queryRunner.query("DROP TABLE TAGITEM");
    await queryRunner.query("DROP TABLE TESTRESULT");
  }
}
