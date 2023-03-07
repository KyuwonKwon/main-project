import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserAddressInput } from '../usersAddress/dto/userAddress.input';
import { CreateUserInput } from './dto/createUser.input';
import { UserWithoutPw } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

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
