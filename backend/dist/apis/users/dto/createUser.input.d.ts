import { User } from '../entities/user.entity';
declare const CreateUserInput_base: import("@nestjs/common").Type<Omit<User, "id" | "point">>;
export declare class CreateUserInput extends CreateUserInput_base {
}
export {};
