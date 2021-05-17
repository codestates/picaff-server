import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import Item from "./Item.entity";
import Tag from "./Tag.entity";

@Entity()
export default class TagItem {
  @PrimaryGeneratedColumn()
  _id!: number;

  @ManyToOne(() => Tag, (tag) => tag.tagItems, {
    nullable: false,
    onDelete: "CASCADE",
  })
  tag!: Tag;

  @ManyToOne(() => Item, (item) => item.tagItems, {
    nullable: false,
    onDelete: "CASCADE",
  })
  item!: Item;
}
