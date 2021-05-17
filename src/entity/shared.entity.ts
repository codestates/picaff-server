import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Shared {
  @PrimaryColumn()
  _id!: number;
  @Column()
  count!: number;
}
