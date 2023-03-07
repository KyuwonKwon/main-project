import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductNutritionFacts {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Float)
  servingsPerContainer: number;

  @Column()
  @Field(() => String)
  unitOfServingsPerContainer: string;

  @Column()
  @Field(() => Float)
  caffeine: number;

  @Column()
  @Field(() => Float)
  kcal: number;

  @Column()
  @Field(() => Float)
  Na: number;

  @Column()
  @Field(() => Float)
  sugars: number;

  @Column()
  @Field(() => Number)
  saturatedFat: number;

  @Column()
  @Field(() => Float)
  protein: number;
}
