import { Field, InputType } from '@nestjs/graphql';

// import { ProductSubCategory } from '../entities/productSubCategory.entity';

// @InputType()
// export class ProductSubCategoryInput extends OmitType(
//     ProductSubCategory,
//     ['id'],
//     InputType,
// ) {}

@InputType()
export class ProductSubCategoryInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  productMainCategoryName: string;
}
