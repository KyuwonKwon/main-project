import { ProductImageInput } from 'src/apis/productsImages/dto/productImage.input';
import { ProductNutritionFactsInput } from 'src/apis/productsNutritionFatcts/dto/productNutritionFacts.input';
import { ProductSubCategoryInput } from 'src/apis/productsSubCategory/dto/productSubCategory.input';
export declare class CreateProductInput {
    koName: string;
    enName: string;
    description: string;
    price: number;
    isNew: boolean;
    stock: number;
    productNutritionFactsInput: ProductNutritionFactsInput;
    productSubCategoryInput: ProductSubCategoryInput;
    productImageInput: ProductImageInput;
    productAllergies: string[];
}
