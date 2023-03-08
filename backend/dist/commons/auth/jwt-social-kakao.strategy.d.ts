import { Strategy } from 'passport-kakao';
import 'dotenv/config';
declare const JwtKakaoStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtKakaoStrategy extends JwtKakaoStrategy_base {
    constructor();
    validate(accessToken: string, refreshToken: string, profile: any): {
        email: any;
        logId: string;
        password: string;
        phone: string;
        name: any;
        personal: string;
    };
}
export {};
