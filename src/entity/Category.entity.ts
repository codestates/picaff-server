import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import Item from "./Item.entity";

@Entity()
export default class Category {
  @PrimaryGeneratedColumn()
  _id!: number;

  @Column()
  categoryName!: string;

  @OneToMany(() => Item, (item) => item.category)
  items!: Item[];
}
