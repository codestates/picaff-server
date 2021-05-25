import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Item from './Item.entity'

@Entity()
export default class ProductCharacter {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  accessibility!: number

  @Column()
  convenience!: number

  @Column()
  effectiveness!: number

  @OneToMany(() => Item, (item) => item.productCharacter)
  items!: Item[]
}
