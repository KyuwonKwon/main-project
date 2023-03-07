import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { UserOrderlist } from 'src/apis/usersOrderlist/entities/userOrderlist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class UserPurchaseItem {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Number)
  price: number;

  @JoinColumn()
  @OneToOne(() => Product)
  @Field(() => Product)
  product: Product;

  @ManyToOne(() => UserOrderlist)
  @Field(() => UserOrderlist)
  userOrderlist: UserOrderlist;
}
