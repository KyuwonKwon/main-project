import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService, //
  ) {}

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { logId: user.logId, sub: user.id },
      { secret: 'myRefreshKey', expiresIn: '2w' },
    );
    // 개발환경
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);
    // 배포환경
    // res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com')
    // res.setHeader(
    //   'Set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`
    // )
  }

  getAccessToken({ user }) {
    return this.jwtService.sign(
      { logId: user.logId, sub: user.id },
      { secret: 'myAccessKey', expiresIn: '10s' },
    );
  }

  async oauthLogin(req: any, res: any) {
    // 1. 가입확인
    let user = await this.userService.findOne({ logId: req.user.logId });
    // 2. 회원가입
    if (!user) {
      user = await this.userService.createUser({
        createUserInput: {
          email: req.user.email,
          password: req.user.password,
          phone: req.user.phone,
          name: req.user.name,
          logId: req.user.logId,
          personal: req.user.personal,
        },
      });
    }
    // 3. 로그인
    this.setRefreshToken({ user, res });
    res.redirect('http://localhost:5500/frontend/login/index.html');
  }
}
