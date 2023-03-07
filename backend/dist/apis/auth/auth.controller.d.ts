import { Request, Response } from 'express';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
interface IOAuthUser {
    user: Pick<User, 'logId' | 'password' | 'name' | 'email' | 'phone' | 'personal'>;
}
export declare class AuthController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    loginGoogle(req: Request & IOAuthUser, res: Response): Promise<void>;
}
export {};
