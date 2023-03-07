import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
export declare class ProductResolver {
    private readonly productService;
    constructor(productService: ProductService);
    fetchProducts(): Promise<Product[]>;
    fetchProductsWithDeleted(): Promise<Product[]>;
    fetchProduct(productId: string): Promise<Product>;
    createProduct(createProductInput: CreateProductInput): Promise<any>;
    updateProduct(productId: string, updateProductInput: UpdateProductInput): Promise<any>;
    deleteProduct(productId: string): Promise<boolean>;
    restoreProduct(productId: string): Promise<boolean>;
}
