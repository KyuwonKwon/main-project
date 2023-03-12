import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async createPayment({
    impUid,
    amount,
    currentUser,
    status = POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
  }) {
    // 1. pointTransaction 테이블에 거래기록 1줄 생성
    const pointTransaction = this.pointTransactionRepository.create({
      impUid,
      amount,
      user: currentUser,
      status,
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

  async checkDuplicate({ impUid }) {
    if (await this.pointTransactionRepository.findOne({ impUid })) {
      throw new ConflictException('중복결제 발생 요청종료');
    }
  }

  async cancelPayment({ impUid, amount, currentUser }) {
    const pointTransaction = await this.createPayment({
      impUid,
      amount: -amount,
      currentUser,
      status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
    });
    return pointTransaction;
  }

  async checkAlreadyCanceled({ impUid }) {
    const pointTransaction = await this.pointTransactionRepository.findOne({
      impUid,
      status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
    });
    if (pointTransaction)
      throw new ConflictException('이미 취소된 결제입니다.');
  }

  async checkHasCancelablePoint({ impUid, currentUser }) {
    const pointTransaction = await this.pointTransactionRepository.findOne({
      impUid,
      user: { id: currentUser.id },
      status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    });
    if (!pointTransaction)
      throw new UnprocessableEntityException('결제 기록이 존재하지 않습니다.');
    const user = await this.userRepository.findOne({ id: currentUser.id });
    if (user.point < pointTransaction.amount)
      throw new UnprocessableEntityException('포인트가 부족합니다.');
  }
}
