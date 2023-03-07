import { InputType, Field, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ProductImageInput } from 'src/apis/productsImages/dto/productImage.input';
import { ProductNutritionFactsInput } from 'src/apis/productsNutritionFatcts/dto/productNutritionFacts.input';
import { ProductSubCategoryInput } from 'src/apis/productsSubCategory/dto/productSubCategory.input';
import { ProductSubCategory } from 'src/apis/productsSubCategory/entities/productSubCategory.entity';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  koName: string;

  @Field(() => String)
  enName: string;

  @Field(() => String)
  description: string;

  @Min(0)
  @Field(() => Int)
  price: number;

  @Field(() => Boolean)
  isNew: boolean;

  @Min(0)
  @Field(() => Int)
  stock: number;

  @Field(() => ProductNutritionFactsInput)
  productNutritionFactsInput: ProductNutritionFactsInput;

  @Field(() => ProductSubCategoryInput)
  productSubCategoryInput: ProductSubCategoryInput;

  @Field(() => ProductImageInput)
  productImageInput: ProductImageInput;

  @Field(() => [String])
  productAllergies: string[];
}
