import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export default class Shared {
  @PrimaryColumn()
  id!: number

  @Column()
  count!: number
}
