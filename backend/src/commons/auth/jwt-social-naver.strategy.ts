import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';
import 'dotenv/config';

export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/naver',
      // scope: ['email', 'profile'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: any) {
    // console.log(accessToken);
    // console.log(refreshToken);
    // console.log(profile);

    // 소셜연결시 동의를 제대로하지 않은 경우 profile 내부값들이
    // undefine 값으로 받아져 네이버 내설정에서 연결철회 후 다시 등록 해야 하는 현상
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
