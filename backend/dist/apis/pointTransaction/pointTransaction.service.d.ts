import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { PointTransaction } from './entities/pointTransaction.entity';
export declare class PointTransactionService {
    private readonly pointTransactionRepository;
    private readonly userRepository;
    constructor(pointTransactionRepository: Repository<PointTransaction>, userRepository: Repository<User>);
    createPayment({ impUid, amount, currentUser }: {
        impUid: any;
        amount: any;
        currentUser: any;
    }): Promise<PointTransaction>;
    checkDuplicate({ impUid }: {
        impUid: any;
    }): Promise<void>;
    cancelPayment({ id }: {
        id: any;
    }): Promise<void>;
}
