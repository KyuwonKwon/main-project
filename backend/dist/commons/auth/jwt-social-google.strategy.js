"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtGoogleStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_google_oauth20_1 = require("passport-google-oauth20");
class JwtGoogleStrategy extends (0, passport_1.PassportStrategy)(passport_google_oauth20_1.Strategy, 'google') {
    constructor() {
        super({
            clientID: '256318950910-e8cifdmvvlnrubpt5nvna30rd5qfqb6t.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://localhost:3000/login/google',
            scope: ['email', 'profile'],
        });
    }
    validate(accessToken, refreshToken, profile) {
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
        return {
            email: profile.emails[0].value,
            logId: 'q1q1',
            password: '12',
            phone: '01047802176',
            name: profile.displayName,
            personal: '1212121212121',
        };
    }
}
exports.JwtGoogleStrategy = JwtGoogleStrategy;
//# sourceMappingURL=jwt-social-google.strategy.js.map