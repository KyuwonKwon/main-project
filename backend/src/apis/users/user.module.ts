import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddress } from '../usersAddress/entities/userAddress.entity';
import { UserOrderlist } from '../usersOrderlist/entities/userOrderlist.entity';
import { UserPurchaseItem } from '../usersPurchaseItem/entities/userPurchaseItem.entity';
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserAddress,
      UserOrderlist,
      UserPurchaseItem,
    ]),
  ],
  providers: [
    UserResolver, //
    UserService,
  ],
})
export class UserModule {}
