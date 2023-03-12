import { Repository } from 'typeorm';
import { UserAddress } from '../usersAddress/entities/userAddress.entity';
import { UserPurchaseItem } from '../usersPurchaseItem/entities/userPurchaseItem.entity';
import { User } from './entities/user.entity';
export declare class UserService {
    private readonly userRepository;
    private readonly userAddrssRepository;
    private readonly userPurchaseItemRepository;
    constructor(userRepository: Repository<User>, userAddrssRepository: Repository<UserAddress>, userPurchaseItemRepository: Repository<UserPurchaseItem>);
    findOne({ logId }: {
        logId: any;
    }): Promise<User>;
    findAll(): Promise<User[]>;
    findAllWithDel(): Promise<User[]>;
    createUser({ createUserInput }: {
        createUserInput: any;
    }): Promise<any>;
    updateUser({ userId, updateUserInput }: {
        userId: any;
        updateUserInput: any;
    }): Promise<any>;
    createUserAddress({ userId, createUserAddressInput }: {
        userId: any;
        createUserAddressInput: any;
    }): Promise<any>;
    delete({ userId }: {
        userId: any;
    }): Promise<boolean>;
    restore({ userId }: {
        userId: any;
    }): Promise<boolean>;
}
