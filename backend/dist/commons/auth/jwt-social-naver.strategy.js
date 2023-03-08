"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtNaverStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_naver_1 = require("passport-naver");
require("dotenv/config");
class JwtNaverStrategy extends (0, passport_1.PassportStrategy)(passport_naver_1.Strategy, 'naver') {
    constructor() {
        super({
            clientID: process.env.NAVER_CLIENT_ID,
            clientSecret: process.env.NAVER_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/login/naver',
        });
    }
    validate(accessToken, refreshToken, profile) {
        return {
            email: profile.emails[0].value,
            logId: 'q1',
            password: '12',
            phone: '01047802176',
            name: profile.displayName,
            personal: '1212121212121',
        };
    }
}
exports.JwtNaverStrategy = JwtNaverStrategy;
//# sourceMappingURL=jwt-social-naver.strategy.js.map