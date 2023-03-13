// user.entity.ts

import { Field, Int, ObjectType, OmitType } from '@nestjs/graphql';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  phone: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  personal: string;

  @Column()
  @Field(() => String)
  logId: string;

  @Column({ default: 0 })
  @Field(() => Int)
  point: number;

  @Column()
  @Field(() => String)
  password: string;

  @DeleteDateColumn()
  deletedAt: Date;
}

@ObjectType()
export class UserWithoutPw extends OmitType(User, ['password'], ObjectType) {}
