import { Product } from 'src/apis/products/entities/product.entity';
import { UserOrderlist } from 'src/apis/usersOrderlist/entities/userOrderlist.entity';
export declare class UserPurchaseItem {
    id: string;
    price: number;
    product: Product;
    userOrderlist: UserOrderlist;
}
