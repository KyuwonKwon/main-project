import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserAddressInput } from '../usersAddress/dto/userAddress.input';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { UserWithoutPw } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  fetchLoginUser(
    @CurrentUser() currentUser: any, //
  ) {
    console.log('fetchUser 실행 완료!!!');
    console.log('유저정보는??!!!', currentUser);
    return 'fetchUser 실행 완료!!!';
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

  @Query(() => [UserWithoutPw])
  fetchUsers() {
    return this.userService.findAll();
  }

  @Query(() => [UserWithoutPw])
  fetchUsersWithDeleted() {
    return this.userService.findAllWithDel();
  }

  @Mutation(() => UserWithoutPw)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
    const hasedPersonal = await bcrypt.hash(createUserInput.personal, 10);
    createUserInput = {
      ...createUserInput,
      password: hashedPassword,
      personal: hasedPersonal,
    };
    return this.userService.createUser({ createUserInput });
  }

  @Mutation(() => UserWithoutPw)
  createUserAddress(
    @Args('userId') userId: string,
    @Args('createUserAddressInput')
    createUserAddressInput: CreateUserAddressInput,
  ) {
    return this.userService.createUserAddress({
      userId,
      createUserAddressInput,
    });
  }

  @Mutation(() => Boolean)
  restoreUser(
    @Args('userId') userId: string, //
  ) {
    return this.userService.restore({ userId });
  }
}
