import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CANCELLED } from 'dns';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';

@Injectable()
export class PointTransactionService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactionRepository: Repository<PointTransaction>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createPayment({ impUid, amount, currentUser }) {
    // 1. pointTransaction 테이블에 거래기록 1줄 생성
    const pointTransaction = this.pointTransactionRepository.create({
      impUid,
      amount,
      user: currentUser,
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });
    await this.pointTransactionRepository.save(pointTransaction);
    // 2. 유저의 돈 찾아오기
    const user = await this.userRepository.findOne({ id: currentUser.id });
    // 3. 유저의 돈 업데이트
    await this.userRepository.update(
      { id: user.id },
      { point: user.point + amount },
    );
    // 4. 최종결과 프론트엔드에 돌려주기
    return pointTransaction;
  }

  async cancelPayment({ id }) {
    const selectedPayment = await this.pointTransactionRepository.findOne(id);
    if (selectedPayment.status === POINT_TRANSACTION_STATUS_ENUM.CANCEL) {
      throw new UnprocessableEntityException('이미 취소되었습니다.');
    }
    await this.pointTransactionRepository.save({
      ...selectedPayment,
      status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
    });
    await this.pointTransactionRepository.softDelete(id);
  }
}
