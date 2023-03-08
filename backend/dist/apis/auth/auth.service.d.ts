import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    setRefreshToken({ user, res }: {
        user: any;
        res: any;
    }): void;
    getAccessToken({ user }: {
        user: any;
    }): string;
    oauthLogin(req: any, res: any): Promise<void>;
}
