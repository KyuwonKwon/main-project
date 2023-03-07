import { ProductSubCategory } from 'src/apis/productsSubCategory/entities/productSubCategory.entity';
import { ProductAllergy } from 'src/apis/productsAllergy/entities/productAllergy.entity';
import { ProductNutritionFacts } from '../../productsNutritionFatcts/entities/productNutritionFacts.entity';
import { ProductImage } from 'src/apis/productsImages/entities/productImage.entity';
export declare class Product {
    id: string;
    koName: string;
    enName: string;
    description: string;
    price: number;
    isNew: boolean;
    stock: number;
    productNutritionFacts: ProductNutritionFacts;
    productSubCategory: ProductSubCategory;
    productAllergies: ProductAllergy[];
    productImage: ProductImage;
    deletedAt: Date;
}
