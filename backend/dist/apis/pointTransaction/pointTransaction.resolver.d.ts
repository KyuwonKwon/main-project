import { ICurrentUser } from 'src/commons/auth/gql-user.param';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointTransactionService } from './pointTransaction.service';
import { IamportService } from '../iamport/iamport.service';
export declare class PointTransactionResolver {
    private readonly pointTransactionService;
    private readonly iamportService;
    constructor(pointTransactionService: PointTransactionService, iamportService: IamportService);
    createPointTransaction(impUid: string, amount: number, currentUser: ICurrentUser): Promise<PointTransaction>;
    cancelPointTransaction(id: string, impUid: string, amount: number, currentUser: ICurrentUser): Promise<void>;
}
