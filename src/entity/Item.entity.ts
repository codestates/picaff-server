import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Category from "./Category.entity";
import ItemCharacter from "./CoffeeCharacter.entity";
import CoffeeCharacter from "./ItemCharacter.entity";
import Liked from "./Liked.entity";
import TagItem from "./TagItem.entity";
import TestResult from "./TestResult.entity";

@Entity()
export default class Item {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  itemName!: string;

  @Column()
  itemPrice!: number;

  @Column()
  itemDetail!: string;

  @Column()
  type!: string;

  @OneToMany(() => TestResult, (testResult) => testResult.itemType)
  itemResults!: TestResult[];
  @OneToMany(() => TestResult, (testResult) => testResult.coffeeType)
  coffeeResults!: TestResult[];

  @OneToMany(() => Liked, (liked) => liked.item)
  likeds!: Liked[];

  @OneToMany(() => TagItem, (tagItem) => tagItem.item)
  tagItems!: TagItem[];

  @ManyToOne(() => Category, (category) => category.items, {
    nullable: false, // migration시 nullable True로 생성됨.
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "categoryId" })
  category!: Category;
  @Column({ default: null })
  categoryId!: number;

  @ManyToOne(() => ItemCharacter, (itemCharacter) => itemCharacter.items, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "itemCharacterId" })
  itemCharacter!: ItemCharacter;
  @Column({ default: null })
  itemCharacterId!: number;

  @ManyToOne(
    () => CoffeeCharacter,
    (coffeeCharacter) => coffeeCharacter.items,
    {
      nullable: true,
      onDelete: "CASCADE",
    }
  )
  @JoinColumn({ name: "coffeeCharacterId" })
  coffeeCharacter!: CoffeeCharacter;
  @Column({ default: null })
  coffeeCharacterId!: number;
}
