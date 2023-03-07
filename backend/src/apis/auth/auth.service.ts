import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
  ) {}

  getAccessToken({ user }) {
    return this.jwtService.sign(
      { logId: user.logId, sub: user.id },
      { secret: 'myAccessKey', expiresIn: '1h' },
    );
  }
}
