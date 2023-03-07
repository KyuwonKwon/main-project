// product.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAllergy } from '../productsAllergy/entities/productAllergy.entity';
import { ProductImage } from '../productsImages/entities/productImage.entity';
import { ProductMainCategory } from '../productsMainCategory/entities/productMainCategory.entity';
import { ProductNutritionFacts } from '../productsNutritionFatcts/entities/productNutritionFacts.entity';
import { ProductSubCategory } from '../productsSubCategory/entities/productSubCategory.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductImage,
      ProductAllergy,
      ProductSubCategory,
      ProductMainCategory,
      ProductNutritionFacts,
    ]),
  ],
  providers: [
    ProductResolver, //
    ProductService,
  ],
})
export class ProductModule {}
