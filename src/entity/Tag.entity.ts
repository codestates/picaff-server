import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import TagItem from "./TagItem.entity";
@Entity()
export default class Tag {
  @PrimaryGeneratedColumn()
  _id!: number;

  @Column()
  tagName!: string;

  @OneToMany(() => TagItem, (tagItem) => tagItem.tag)
  tagItems!: TagItem[];
}
