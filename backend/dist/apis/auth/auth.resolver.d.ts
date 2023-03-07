import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
import { UpdateUserInput } from '../users/dto/updateUser.input';
export declare class AuthResolver {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    login(logId: string, password: string, context: any): Promise<string>;
    restoreAccessToken(currentUser: any): string;
    fetchLoginUser(currentUser: any): string;
    deleteLoginUser(currentUser: any): Promise<boolean>;
    updateUserPwd(currentUser: any, updateUserInput: UpdateUserInput): Promise<any>;
}
