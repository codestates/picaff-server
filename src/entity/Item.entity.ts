import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import ProductCharacter from './ProductCharacter.entity'
import CoffeeCharacter from './CoffeeCharacter.entity'
import Liked from './Liked.entity'
import TagItem from './TagItem.entity'
import TestResult from './TestResult.entity'

@Entity()
export default class Item {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  itemName!: string

  @Column()
  itemPrice!: number

  @Column('text')
  itemDetail!: string

  @Column()
  type!: string

  @Column({ default: '' })
  imageUrl!: string

  @Column({ type: 'varchar' })
  iso!: string

  @OneToMany(() => TestResult, (testResult) => testResult.itemType)
  itemResults!: TestResult[]
  @OneToMany(() => TestResult, (testResult) => testResult.coffeeType)
  coffeeResults!: TestResult[]

  @OneToMany(() => Liked, (liked) => liked.item, { cascade: true })
  likeds!: Liked[]

  @OneToMany(() => TagItem, (tagItem) => tagItem.item, { cascade: true })
  tagItems!: TagItem[]

  @ManyToOne(() => ProductCharacter, (productCharacter) => productCharacter.items, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productCharacterId' })
  productCharacter!: ProductCharacter
  @Column({ default: null })
  productCharacterId!: number

  @ManyToOne(() => CoffeeCharacter, (coffeeCharacter) => coffeeCharacter.items, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'coffeeCharacterId' })
  coffeeCharacter!: CoffeeCharacter
  @Column({ default: null })
  coffeeCharacterId!: number
}
