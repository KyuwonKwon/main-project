import {
  // HttpException,
  // HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAddress } from '../usersAddress/entities/userAddress.entity';
import { UserPurchaseItem } from '../usersPurchaseItem/entities/userPurchaseItem.entity';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserAddress)
    private readonly userAddrssRepository: Repository<UserAddress>,
    @InjectRepository(UserPurchaseItem)
    private readonly userPurchaseItemRepository: Repository<UserPurchaseItem>,
  ) {}

  async findOne({ logId }) {
    return await this.userRepository.findOne({
      where: { logId },
      // relations: ['userAddress', 'userOrdrlist', 'userPurchaseItem'],
    });
  }

  async findAll() {
    return await this.userRepository.find({
      // relations: ['userAddress', 'userOrdrlist', 'userPurchaseItem'],
    });
  }

  async findAllWithDel() {
    return await this.userRepository.find({
      withDeleted: true,
      // relations: ['userAddress', 'userOrdrlist', 'userPurchaseItem'],
    });
  }

  //error -> main.ts/  forbidUnknown:false
  async createUser({ createUserInput }) {
    const { logId } = createUserInput;
    const prevUser = await this.userRepository.findOne({
      where: { logId },
    });
    if (prevUser) {
      throw new UnprocessableEntityException('이미 가입된 계정이 있습니다.');
    } else {
      const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
      const hasedPersonal = await bcrypt.hash(createUserInput.personal, 10);
      createUserInput = {
        ...createUserInput,
        password: hashedPassword,
        personal: hasedPersonal,
      };
      const { password, ...newUser } = await this.userRepository.save(
        createUserInput,
      );
      return newUser;
    }
  }

  async updateUser({ userId, updateUserInput }) {
    const myuser = await this.userRepository.findOne({
      where: { id: userId },
    });
    const newUser = {
      ...myuser,
      ...updateUserInput,
    };
    return await this.userRepository.save(newUser);
  }

  async createUserAddress({ userId, createUserAddressInput }) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    return await this.userAddrssRepository.save({
      ...createUserAddressInput,
      user: user,
    });
  }

  async delete({ userId }) {
    const result = await this.userRepository.softDelete({ id: userId });
    return result.affected ? true : false;
  }

  async restore({ userId }) {
    const result = await this.userRepository.restore({ id: userId });
    return result.affected ? true : false;
  }
}
