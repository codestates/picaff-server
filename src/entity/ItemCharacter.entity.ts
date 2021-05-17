import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import Item from "./Item.entity";

@Entity()
export default class ItemCharacter {
  @PrimaryGeneratedColumn()
  _id!: number;

  @Column()
  accessibility!: number;

  @Column()
  convenience!: number;

  @Column()
  effectiveness!: number;

  @OneToMany(() => Item, (item) => item.itemCharacter)
  items!: Item[];
}
