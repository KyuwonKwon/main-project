import { Request, Response } from 'express';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
interface IOAuthUser {
    user: Pick<User, 'logId' | 'password' | 'name' | 'email' | 'phone' | 'personal'>;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loginGoogle(req: Request & IOAuthUser, res: Response): Promise<void>;
    loginNaver(req: Request & IOAuthUser, res: Response): Promise<void>;
    loginKakao(req: Request & IOAuthUser, res: Response): Promise<void>;
}
export {};
