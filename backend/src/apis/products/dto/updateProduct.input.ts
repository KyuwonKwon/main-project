import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './createProduct.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {}

// export class UpdateProductInput {
//   @Field(() => String, { nullable: true })
//   koName: string;

//   @Field(() => String, { nullable: true })
//   enName: string;

//   @Field(() => String, { nullable: true })
//   description: string;

//   @Min(0)
//   @Field(() => Int, { nullable: true })
//   price: number;

//   @Field(() => Boolean, { nullable: true })
//   isNew: boolean;

//   @Min(0)
//   @Field(() => Int, { nullable: true })
//   stock: number;
// }
