import { Repository } from 'typeorm';
import { ProductAllergy } from '../productsAllergy/entities/productAllergy.entity';
import { ProductImage } from '../productsImages/entities/productImage.entity';
import { ProductMainCategory } from '../productsMainCategory/entities/productMainCategory.entity';
import { ProductNutritionFacts } from '../productsNutritionFatcts/entities/productNutritionFacts.entity';
import { ProductSubCategory } from '../productsSubCategory/entities/productSubCategory.entity';
import { Product } from './entities/product.entity';
export declare class ProductService {
    private readonly productRepository;
    private readonly productImageRepository;
    private readonly productAllergyRepository;
    private readonly productSubCategoryRepository;
    private readonly productMainCategoryRepository;
    private readonly productNutritionFactsRepository;
    constructor(productRepository: Repository<Product>, productImageRepository: Repository<ProductImage>, productAllergyRepository: Repository<ProductAllergy>, productSubCategoryRepository: Repository<ProductSubCategory>, productMainCategoryRepository: Repository<ProductMainCategory>, productNutritionFactsRepository: Repository<ProductNutritionFacts>);
    findAll(): Promise<Product[]>;
    findAllwithDel(): Promise<Product[]>;
    findOne({ productId }: {
        productId: any;
    }): Promise<Product>;
    create({ createProductInput }: {
        createProductInput: any;
    }): Promise<any>;
    update({ productId, updateProductInput }: {
        productId: any;
        updateProductInput: any;
    }): Promise<any>;
    checkSoldout({ productId }: {
        productId: any;
    }): Promise<void>;
    delete({ productId }: {
        productId: any;
    }): Promise<boolean>;
    restore({ productId }: {
        productId: any;
    }): Promise<boolean>;
}
