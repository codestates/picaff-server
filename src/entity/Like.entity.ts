import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Item from "./Item.entity";
import User from "./User.entity";

@Entity()
export default class Like {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.likes, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user!: User;
  @Column({ default: null })
  userId!: number;

  @ManyToOne(() => Item, (item) => item.likes, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "itemId" })
  item!: Item;
  @Column({ default: null })
  itemId!: number;
}
