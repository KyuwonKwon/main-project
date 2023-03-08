import { Strategy } from 'passport-naver';
import 'dotenv/config';
declare const JwtNaverStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtNaverStrategy extends JwtNaverStrategy_base {
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
