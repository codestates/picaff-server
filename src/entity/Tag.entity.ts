import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import TagItem from './TagItem.entity'
import Item from './Item.entity'

@Entity()
export default class Tag {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  tagName!: string

  @OneToMany(() => TagItem, (tagItem) => tagItem.tag)
  tagItems!: TagItem[]

  // @ManyToMany(() => Item)
  // @JoinTable({ name: 'tag_item' })
  // items!: Item[]
  // @Column({name: 'id'})
}
