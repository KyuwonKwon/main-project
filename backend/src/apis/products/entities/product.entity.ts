import { ProductSubCategory } from 'src/apis/productsSubCategory/entities/productSubCategory.entity';
import { ProductAllergy } from 'src/apis/productsAllergy/entities/productAllergy.entity';
import { ProductNutritionFacts } from '../../productsNutritionFatcts/entities/productNutritionFacts.entity';
import { ProductImage } from 'src/apis/productsImages/entities/productImage.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  koName: string;

  @Column()
  @Field(() => String)
  enName: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column({ default: true })
  @Field(() => Boolean)
  isNew: boolean;

  @Column()
  @Field(() => Int)
  stock: number;

  @JoinColumn()
  @OneToOne(() => ProductNutritionFacts)
  @Field(() => ProductNutritionFacts)
  productNutritionFacts: ProductNutritionFacts;

  @ManyToOne(() => ProductSubCategory)
  @Field(() => ProductSubCategory)
  productSubCategory: ProductSubCategory;

  @JoinTable()
  @ManyToMany(() => ProductAllergy, (productAllergy) => productAllergy.products)
  @Field(() => [ProductAllergy])
  productAllergies: ProductAllergy[];

  @JoinColumn()
  @OneToOne(() => ProductImage)
  @Field(() => ProductImage)
  productImage: ProductImage;

  @DeleteDateColumn()
  deletedAt: Date;
}
