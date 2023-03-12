import { UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import {
  GqlAuthAccessGuard,
  GqlAuthRefreshGuard,
} from 'src/commons/auth/gql-auth.guard';
import { User, UserWithoutPw } from '../users/entities/user.entity';
import { UpdateUserInput } from '../users/dto/updateUser.input';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService, //
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('logId') logId: string, //
    @Args('password') password: string,
    @Context() context: any,
  ) {
    // 1. 로그인(이메일이 일치하는 유저를 DB에서 찾기)
    const user = await this.userService.findOne({ logId });
    // 2. 일치하는 유저가 없으면 에러
    if (!user)
      throw new UnprocessableEntityException('존재하지 않는 아이디입니다.');
    // 3. 일치하는 유저가 있지만, 비밀번호가 틀렸다면 에러
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');
    // 4. refreshToken(=JWT)을 만들어서 프론트엔드(쿠키)에 보내주기
    this.authService.setRefreshToken({ user, res: context.res });
    // 5. 일치하는 유저가 있으면 accessToken(=JWT)을 만들어서 브라우저에 전달
    return this.authService.getAccessToken({ user });
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(
    @CurrentUser() currentUser: any, //
  ) {
    return this.authService.getAccessToken({ user: currentUser });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  async fetchLoginUser(
    @CurrentUser() currentUser: any, //
  ) {
    const result = await this.userService.findOne({ logId: currentUser.logId });
    return result;
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteLoginUser(
    @CurrentUser() currentUser: any, //
  ) {
    return this.userService.delete({ userId: currentUser.id });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => UserWithoutPw)
  async updateUserPwd(
    @CurrentUser() currentUser: any,
    @Args('newPwd') updateUserInput: UpdateUserInput,
  ) {
    updateUserInput = {
      ...updateUserInput,
      password: await bcrypt.hash(updateUserInput.password, 10),
    };
    return this.userService.updateUser({
      userId: currentUser.id,
      updateUserInput,
    });
  }
}
