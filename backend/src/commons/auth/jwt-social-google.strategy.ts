import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import * as dotenv from 'dotenv';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: '//', // env수정필요
      clientSecret: '//',
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
