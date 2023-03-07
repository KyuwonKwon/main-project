// product.service.ts

import {
  // HttpException,
  // HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductAllergy } from '../productsAllergy/entities/productAllergy.entity';
import { ProductImage } from '../productsImages/entities/productImage.entity';
import { ProductMainCategory } from '../productsMainCategory/entities/productMainCategory.entity';
import { ProductNutritionFacts } from '../productsNutritionFatcts/entities/productNutritionFacts.entity';
import { ProductSubCategory } from '../productsSubCategory/entities/productSubCategory.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
    @InjectRepository(ProductAllergy)
    private readonly productAllergyRepository: Repository<ProductAllergy>,
    @InjectRepository(ProductSubCategory)
    private readonly productSubCategoryRepository: Repository<ProductSubCategory>,
    @InjectRepository(ProductMainCategory)
    private readonly productMainCategoryRepository: Repository<ProductMainCategory>,
    @InjectRepository(ProductNutritionFacts)
    private readonly productNutritionFactsRepository: Repository<ProductNutritionFacts>,
  ) {}

  async findAll() {
    return await this.productRepository.find({
      relations: [
        'productImage',
        'productAllergies',
        'productSubCategory',
        'productNutritionFacts',
      ],
    });
  }

  async findAllwithDel() {
    return await this.productRepository.find({
      withDeleted: true,
      relations: [
        'productImage',
        'productAllergies',
        'productSubCategory',
        'productNutritionFacts',
      ],
    });
  }

  async findOne({ productId }) {
    return await this.productRepository.findOne({
      where: { id: productId },
      relations: [
        'productImage',
        'productAllergies',
        'productSubCategory',
        'productNutritionFacts',
      ],
    });
  }

  async create({ createProductInput }) {
    const {
      productImageInput,
      productAllergies,
      productSubCategoryInput,
      productNutritionFactsInput,
      ...product
    } = createProductInput;
    //1. 영양성분
    const result = await this.productNutritionFactsRepository.save({
      ...productNutritionFactsInput,
    });
    //2. 이미지
    const result2 = await this.productImageRepository.save({
      ...productImageInput,
    });
    //3. 알러지
    const result3 = [];
    for (let i = 0; i < productAllergies.length; i++) {
      const allergyName = productAllergies[i];
      const prevAllergy = await this.productAllergyRepository.findOne({
        name: allergyName,
      });
      if (prevAllergy) {
        result3.push(prevAllergy);
      } else {
        const newAllergy = await this.productAllergyRepository.save({
          name: allergyName,
        });
        result3.push(newAllergy);
      }
    }
    //4. 카테고리
    let result4: ProductSubCategory;
    const { name, productMainCategoryName } = productSubCategoryInput;
    const prevMainCategory = await this.productMainCategoryRepository.findOne({
      name: productMainCategoryName,
    });
    if (prevMainCategory) {
      const prevSubCategory = await this.productSubCategoryRepository.findOne({
        where: { name: name },
        relations: ['productMainCategory'],
      });
      if (prevSubCategory) {
        result4 = prevSubCategory;
      } else {
        result4 = await this.productSubCategoryRepository.save({
          name: name,
          productMainCategory: prevMainCategory,
        });
      }
    } else {
      const productMainCategory = await this.productMainCategoryRepository.save(
        {
          name: productMainCategoryName,
        },
      );
      result4 = await this.productSubCategoryRepository.save({
        name: name,
        productMainCategory: productMainCategory,
      });
    }
    // 모아서 상품으로
    const result5 = await this.productRepository.save({
      ...product,
      productNutritionFacts: result,
      productImage: result2,
      productAllergies: result3,
      productSubCategory: result4,
    });
    return result5;
  }

  async update({ productId, updateProductInput }) {
    const myproduct = await this.productRepository.findOne({
      where: { id: productId },
    });
    const newProduct = {
      ...myproduct,
      // id: productId,
      ...updateProductInput,
    };
    return await this.productRepository.save(newProduct);
  }

  async checkSoldout({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (product.stock < 1)
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
  }

  async delete({ productId }) {
    const result = await this.productRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }

  async restore({ productId }) {
    const result = await this.productRepository.restore({ id: productId });
    return result.affected ? true : false;
  }
}
