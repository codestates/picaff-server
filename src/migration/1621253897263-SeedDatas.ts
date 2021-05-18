import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { UserDataSeed } from "../seeds/user.seed";
import { CategoryDataSeed } from "../seeds/category.seed";
import { ItemDataSeed } from "../seeds/item.seed";
import { CoffeeCharacterDataSeed } from "../seeds/coffeeCharacter.seed";
import { ItemCharacterDataSeed } from "../seeds/itemCharacter.seed";
import { LikeDataSeed } from "../seeds/like.seed";
import { TagDataSeed } from "../seeds/tag.seed";
import { TagItemDataSeed } from "../seeds/tagItem.seed";
import { TestResultDataSeed } from "../seeds/testResult.seed";
import { query } from "express";

export class SeedDatas1621253897263 implements MigrationInterface {
  name = "SeedDatas1621253897263";
  //   const queryRunner = connection.createQueryRunner(); DB셋업 마이그레이션쪽으로 빼는시도중
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getRepository("User").save(UserDataSeed);
    await getRepository("Category").save(CategoryDataSeed);
    await getRepository("CoffeeCharacter").save(CoffeeCharacterDataSeed);
    await getRepository("ItemCharacter").save(ItemCharacterDataSeed);
    await getRepository("Tag").save(TagDataSeed);
    await getRepository("Item").save(ItemDataSeed);
    await getRepository("Like").save(LikeDataSeed);
    await getRepository("TagItem").save(TagItemDataSeed);
    await getRepository("TestResult").save(TestResultDataSeed);
    await query;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE user");
    await queryRunner.query("DROP TABLE category");
    await queryRunner.query("DROP TABLE item");
    await queryRunner.query("DROP TABLE coffeeCharacter");
    await queryRunner.query("DROP TABLE like");
    await queryRunner.query("DROP TABLE tag");
    await queryRunner.query("DROP TABLE tagItem");
    await queryRunner.query("DROP TABLE testResult");
  }
}
