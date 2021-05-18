import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import Like from "./Like.entity";
import TestResult from "./TestResult.entity";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  userName!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @OneToMany(() => TestResult, (testResult) => testResult.user)
  testResults!: TestResult[];

  @OneToMany(() => Like, (like) => like.user)
  likes!: Like[];
}
