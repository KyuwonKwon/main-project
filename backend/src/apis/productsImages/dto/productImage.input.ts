import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProductImageInput {
  @Field(() => String)
  Url: string;
}
