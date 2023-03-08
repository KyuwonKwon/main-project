"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtKakaoStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_kakao_1 = require("passport-kakao");
require("dotenv/config");
class JwtKakaoStrategy extends (0, passport_1.PassportStrategy)(passport_kakao_1.Strategy, 'kakao') {
    constructor() {
        super({
            clientID: process.env.KAKAO_CLIENT_ID,
            clientSecret: process.env.KAKAO_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/login/kakao',
            scope: ['account_email', 'profile_nickname'],
        });
    }
    validate(accessToken, refreshToken, profile) {
        return {
            email: profile._json.kakao_account.email,
            logId: 'q1q1q1',
            password: '12',
            phone: '01047802176',
            name: profile.displayName,
            personal: '1212121212121',
        };
    }
}
exports.JwtKakaoStrategy = JwtKakaoStrategy;
//# sourceMappingURL=jwt-social-kakao.strategy.js.map