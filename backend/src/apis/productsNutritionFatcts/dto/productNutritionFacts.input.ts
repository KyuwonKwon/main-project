import { InputType, OmitType } from '@nestjs/graphql';
import { ProductNutritionFacts } from '../entities/productNutritionFacts.entity';

@InputType()
export class ProductNutritionFactsInput extends OmitType(
  ProductNutritionFacts,
  ['id'],
  InputType,
) {}
