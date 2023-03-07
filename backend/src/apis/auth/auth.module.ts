import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';
import { JwtGoogleStrategy } from 'src/commons/auth/jwt-social-google.strategy';
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';
import { UserAddress } from '../usersAddress/entities/userAddress.entity';
import { UserOrderlist } from '../usersOrderlist/entities/userOrderlist.entity';
import { UserPurchaseItem } from '../usersPurchaseItem/entities/userPurchaseItem.entity';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({}), //
    TypeOrmModule.forFeature([
      User,
      UserAddress,
      UserOrderlist,
      UserPurchaseItem,
    ]),
  ],
  providers: [
    JwtRefreshStrategy,
    JwtAccessStrategy,
    JwtGoogleStrategy,
    AuthResolver, //
    AuthService,
    UserService,
  ],
  controllers: [
    AuthController, //
  ],
})
export class AuthModule {}
