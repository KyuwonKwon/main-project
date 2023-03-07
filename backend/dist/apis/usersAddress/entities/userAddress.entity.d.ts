import { User } from 'src/apis/users/entities/user.entity';
export declare class UserAddress {
    id: string;
    name: string;
    isMain: boolean;
    user: User;
}
