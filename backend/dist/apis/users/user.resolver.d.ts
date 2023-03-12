import { CreateUserAddressInput } from '../usersAddress/dto/userAddress.input';
import { CreateUserInput } from './dto/createUser.input';
import { UserService } from './user.service';
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    fetchUsers(): Promise<import("./entities/user.entity").User[]>;
    fetchUsersWithDeleted(): Promise<import("./entities/user.entity").User[]>;
    createUser(createUserInput: CreateUserInput): Promise<any>;
    createUserAddress(userId: string, createUserAddressInput: CreateUserAddressInput): Promise<any>;
    restoreUser(userId: string): Promise<boolean>;
}
