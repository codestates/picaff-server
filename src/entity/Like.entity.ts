import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import Item from "./Item.entity";
import User from "./User.entity";

@Entity()
export default class Like {
  @PrimaryGeneratedColumn()
  _id!: number;

  @ManyToOne(() => User, (user) => user.likes, {
    nullable: false,
    onDelete: "CASCADE",
  })
  user!: User;

  @ManyToOne(() => Item, (item) => item.likes, {
    nullable: false,
    onDelete: "CASCADE",
  })
  item!: Item;
}
