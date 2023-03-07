import { InputType, OmitType } from '@nestjs/graphql';
import { UserAddress } from '../entities/userAddress.entity';

@InputType()
export class CreateUserAddressInput extends OmitType(
  UserAddress,
  ['id', 'user'],
  InputType,
) {}
