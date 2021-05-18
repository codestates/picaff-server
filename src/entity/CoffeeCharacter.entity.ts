import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Item from "./Item.entity";

@Entity()
export default class CoffeeCharacter {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sweetness!: number;

  @Column()
  sourness!: number;

  @Column()
  balance!: number;

  @Column()
  body!: number;

  @Column()
  aroma!: number;

  @Column()
  afterTaste!: number;

  @OneToMany(() => Item, (item) => item.coffeeCharacter)
  items!: Item[];
}
