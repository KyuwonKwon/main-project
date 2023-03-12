import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';
import { PointTransactionService } from './pointTransaction.service';
import { IamportService } from '../iamport/iamport.service';

@Resolver()
export class PointTransactionResolver {
  constructor(
    private readonly pointTransactionService: PointTransactionService,
    private readonly iamportService: IamportService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointTransaction)
  async createPointTransaction(
    @Args('impUid') impUid: string,
    @Args('amount') amount: number,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    //1. iamport token 받아오기
    const token = await this.iamportService.getToken();
    //2. iamport 에서 결제 정보확인
    await this.iamportService.checkPaid({ impUid, amount, token });
    //3. 내 DB에 거래가 이미 등록되었는지 확인
    await this.pointTransactionService.checkDuplicate({ impUid });
    //4. 내 DB에 거래 기록
    return this.pointTransactionService.createPayment({
      impUid,
      amount,
      currentUser,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointTransaction)
  async cancelPointTransaction(
    @Args('impUid') impUid: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    // 1. 이미 취소되었는지 확인
    await this.pointTransactionService.checkAlreadyCanceled({ impUid });
    // 2. 잔액이 충분한지
    await this.pointTransactionService.checkHasCancelablePoint({
      impUid,
      currentUser,
    });
    // 3-1. iamport에 토큰 요청
    const token = await this.iamportService.getToken();
    // 3-2. iamport에 취소 요청
    const canceledAmount = await this.iamportService.cancel({ impUid, token });

    return await this.pointTransactionService.createPayment({
      impUid,
      amount: -canceledAmount,
      currentUser,
      status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
    });
  }
}
