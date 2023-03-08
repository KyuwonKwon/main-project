import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';

interface IOAuthUser {
  user: Pick<
    User,
    'logId' | 'password' | 'name' | 'email' | 'phone' | 'personal'
  >;
}

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
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
    this.authService.setRefreshToken({ user, res });
    res.redirect('http://localhost:5500/frontend/login/index.html');
  }

  @Get('/login/naver')
  @UseGuards(AuthGuard('naver'))
  async loginNaver(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
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
    this.authService.setRefreshToken({ user, res });
    res.redirect('http://localhost:5500/frontend/login/index.html');
  }

  @Get('/login/kakao')
  @UseGuards(AuthGuard('kakao'))
  async loginKakao(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
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
    this.authService.setRefreshToken({ user, res });
    res.redirect('http://localhost:5500/frontend/login/index.html');
  }
}
