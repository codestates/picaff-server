import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Item from "./Item.entity";

@Entity()
export default class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  categoryName!: string;

  @OneToMany(() => Item, (item) => item.category)
  items!: Item[];
}
