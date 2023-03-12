export declare class IamportService {
    getToken(): Promise<any>;
    hasPayment({ impUid, token }: {
        impUid: any;
        token: any;
    }): Promise<void>;
}
