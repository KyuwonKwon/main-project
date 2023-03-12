import {
  HttpException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IamportService {
  async getToken() {
    try {
      const result = await axios.post('https://api.iamport.kr/users/getToken', {
        imp_key: process.env.IAMPORT_KEY,
        imp_secret: process.env.IAMPORT_SECRET,
      });
      return result.data.response.access_token;
    } catch (error) {
      throw new HttpException(
        error.response.data.message,
        error.response.status,
      );
    }
  }

  async checkPaid({ impUid, amount, token }) {
    try {
      const result = await axios({
        url: `https://api.iamport.kr/payments/${impUid}`,
        method: 'get', // GET method
        headers: {
          // "Content-Type": "application/json"
          'Content-Type': 'application/json',
          // 발행된 액세스 토큰
          Authorization: `Bearer ${token}`,
        },
      });

      if (result.data.response.amount !== amount) {
        throw new UnprocessableEntityException('유효하지 않은 결제입니다.');
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        throw new HttpException(
          error.response.data.message,
          error.response.status,
        );
      } else {
        throw error;
      }
    }
  }

  async cancel({ impUid, token }) {
    try {
      const result = await axios({
        url: 'https://api.iamport.kr/payments/cancel',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // 포트원 서버로부터 발급받은 엑세스 토큰
        },
        data: {
          // reason, // 가맹점 클라이언트로부터 받은 환불사유
          imp_uid: impUid, // imp_uid를 환불 `unique key`로 입력
          // amount: cancel_request_amount, // 가맹점 클라이언트로부터 받은 환불금액
          // checksum: cancelableAmount, // [권장] 환불 가능 금액 입력
        },
      });
      return result.data.response.cancel_amount;
    } catch (error) {
      throw new HttpException(
        error.response.data.message,
        error.response.status,
      );
    }
  }
}
