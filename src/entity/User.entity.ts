import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import Liked from "./Liked.entity";
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

  @OneToMany(() => Liked, (liked) => liked.user)
  likeds!: Liked[];
}

// "start": "tsc && ts-node -r tsconfig-paths/register server/index.ts",
// "migration": "npx ts-node ./node_modules/typeorm/cli.js migration:run"
// "start": "nodemon --watch server --delay 1 --exec 'ts-node' server/index.ts",
