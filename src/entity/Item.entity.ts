import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import Category from "./Category.entity";
import ItemCharacter from "./CoffeeCharacter.entity";
import CoffeeCharacter from "./ItemCharacter.entity";
import Like from "./Like.entity";
import TagItem from "./TagItem.entity";
import TestResult from "./TestResult.entity";

@Entity()
export default class Item {
  @PrimaryGeneratedColumn()
  _id!: number;

  @Column()
  itemName!: string;

  @Column()
  itemPrice!: number;

  @Column()
  itemDetail!: string;

  @Column()
  type!: string;

  // @OneToMany(() => TestResult, (testResult) => testResult._id)
  // itemResult!: TestResult[];
  // @OneToMany(() => TestResult, (testResult) => testResult._id)
  // coffeeResult!: TestResult[];
  @OneToMany(() => TestResult, (testResult) => testResult.itemType)
  itemResult!: TestResult[];
  @OneToMany(() => TestResult, (testResult) => testResult.coffeeType)
  coffeeResult!: TestResult[];

  @OneToMany(() => Like, (like) => like.item)
  likes!: Like[];

  @OneToMany(() => TagItem, (tagItem) => tagItem.item)
  tagItems!: TagItem[];

  @ManyToOne(() => Category, (category) => category.items, {
    nullable: false,
    onDelete: "CASCADE",
  })
  category!: Category;

  @ManyToOne(() => ItemCharacter, (itemCharacter) => itemCharacter.items, {
    nullable: true,
    onDelete: "CASCADE",
  })
  itemCharacter!: ItemCharacter;

  @ManyToOne(
    () => CoffeeCharacter,
    (coffeeCharacter) => coffeeCharacter.items,
    {
      nullable: true,
      onDelete: "CASCADE",
    }
  )
  coffeeCharacter!: CoffeeCharacter;
}
