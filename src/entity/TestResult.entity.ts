import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User.entity";
import Item from "./Item.entity";

@Entity()
export default class TestResult {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.testResults, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user!: User;
  @Column({ default: null })
  userId!: number;

  @ManyToOne(() => Item, (item) => item.itemResult, {
    nullable: false, // migration 위해 임시로 true로 바꿔둠
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "itemTypeId" })
  itemType!: Item;
  @Column({ default: null })
  itemTypeId!: number;

  @ManyToOne(() => Item, (item) => item.coffeeResult, {
    nullable: false, // migration 위해 임시로 true로 바꿔둠
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "coffeeTypeId" })
  coffeeType!: Item;
  @Column({ default: null })
  coffeeTypeId!: number;
}
