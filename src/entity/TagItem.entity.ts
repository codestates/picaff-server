import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Item from "./Item.entity";
import Tag from "./Tag.entity";

@Entity()
export default class TagItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Tag, (tag) => tag.tagItems, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "tagId" })
  tag!: Tag;
  @Column({ default: null })
  tagId!: number;

  @ManyToOne(() => Item, (item) => item.tagItems, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "itemId" })
  item!: Item;
  @Column({ default: null })
  itemId!: number;
}
