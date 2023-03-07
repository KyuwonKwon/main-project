import { UserAddress } from '../entities/userAddress.entity';
declare const CreateUserAddressInput_base: import("@nestjs/common").Type<Omit<UserAddress, "id" | "user">>;
export declare class CreateUserAddressInput extends CreateUserAddressInput_base {
}
export {};
