import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User.entity";
import Item from "./Item.entity";
// import { Item } from "./Item.entity";

@Entity()
export default class TestResult {
  @PrimaryGeneratedColumn()
  _id!: number;

  @ManyToOne(() => User, (user) => user.testResults, {
    nullable: true,
    onDelete: "CASCADE",
  })
  user!: User;

  @ManyToOne(() => Item, (item) => item.itemResult, {
    nullable: false,
    onDelete: "CASCADE",
  })
  itemType!: Item;

  @ManyToOne(() => Item, (item) => item.coffeeResult, {
    nullable: false,
    onDelete: "CASCADE",
  })
  coffeeType!: Item;
}
