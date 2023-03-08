import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import 'dotenv/config';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/kakao',
      // scope: ['account_email', 'profile_nickname'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: any) {
    // console.log(accessToken);
    // console.log(refreshToken);
    // console.log(profile);
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
