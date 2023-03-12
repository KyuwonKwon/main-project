"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointTransactionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const pointTransaction_entity_1 = require("./entities/pointTransaction.entity");
let PointTransactionService = class PointTransactionService {
    constructor(pointTransactionRepository, userRepository) {
        this.pointTransactionRepository = pointTransactionRepository;
        this.userRepository = userRepository;
    }
    async createPayment({ impUid, amount, currentUser }) {
        const pointTransaction = this.pointTransactionRepository.create({
            impUid,
            amount,
            user: currentUser,
            status: pointTransaction_entity_1.POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
        });
        await this.pointTransactionRepository.save(pointTransaction);
        const user = await this.userRepository.findOne({ id: currentUser.id });
        await this.userRepository.update({ id: user.id }, { point: user.point + amount });
        return pointTransaction;
    }
    async checkDuplicate({ impUid }) {
        if (await this.pointTransactionRepository.findOne({ impUid })) {
            throw new common_1.ConflictException('중복결제 발생 요청종료');
        }
    }
    async cancelPayment({ id }) {
        const selectedPayment = await this.pointTransactionRepository.findOne({
            id,
        });
        if (selectedPayment.status === pointTransaction_entity_1.POINT_TRANSACTION_STATUS_ENUM.CANCEL) {
            throw new common_1.UnprocessableEntityException('이미 취소되었습니다.');
        }
        await this.pointTransactionRepository.save(Object.assign(Object.assign({}, selectedPayment), { status: pointTransaction_entity_1.POINT_TRANSACTION_STATUS_ENUM.CANCEL }));
        await this.pointTransactionRepository.softDelete(id);
    }
};
PointTransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pointTransaction_entity_1.PointTransaction)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PointTransactionService);
exports.PointTransactionService = PointTransactionService;
//# sourceMappingURL=pointTransaction.service.js.map