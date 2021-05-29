import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  BaseEntity,
  Unique,
} from 'typeorm'
import Item from './Item.entity'
import User from './User.entity'

@Entity()
export default class Liked {
  @Unique(['userId', 'itemId'])
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => User, (user) => user.likeds, {
    nullable: true,
    onDelete: 'CASCADE',
    primary: true,
  })
  @JoinColumn({ name: 'userId' })
  user!: User
  @Column({ default: null })
  userId!: number

  @ManyToOne(() => Item, (item) => item.likeds, {
    nullable: true,
    onDelete: 'CASCADE',
    primary: true,
  })
  @JoinColumn({ name: 'itemId' })
  item!: Item
  @Column({ default: null })
  itemId!: number
}
