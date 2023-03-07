export declare class User {
    id: string;
    name: string;
    phone: string;
    email: string;
    personal: string;
    logId: string;
    password: string;
    deletedAt: Date;
}
declare const UserWithoutPw_base: import("@nestjs/common").Type<Omit<User, "password">>;
export declare class UserWithoutPw extends UserWithoutPw_base {
}
export {};
