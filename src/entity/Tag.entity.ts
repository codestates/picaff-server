import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import TagItem from "./TagItem.entity";

@Entity()
export default class Tag {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  tagName!: string;

  @OneToMany(() => TagItem, (tagItem) => tagItem.tag)
  tagItems!: TagItem[];
}
