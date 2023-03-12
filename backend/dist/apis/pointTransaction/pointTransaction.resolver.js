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
exports.PointTransactionResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const gql_auth_guard_1 = require("../../commons/auth/gql-auth.guard");
const gql_user_param_1 = require("../../commons/auth/gql-user.param");
const pointTransaction_entity_1 = require("./entities/pointTransaction.entity");
const pointTransaction_service_1 = require("./pointTransaction.service");
const iamport_service_1 = require("../iamport/iamport.service");
let PointTransactionResolver = class PointTransactionResolver {
    constructor(pointTransactionService, iamportService) {
        this.pointTransactionService = pointTransactionService;
        this.iamportService = iamportService;
    }
    async createPointTransaction(impUid, amount, currentUser) {
        const token = await this.iamportService.getToken();
        await this.iamportService.hasPayment({ impUid, token });
        await this.pointTransactionService.checkDuplicate({ impUid });
        return this.pointTransactionService.createPayment({
            impUid,
            amount,
            currentUser,
        });
    }
    cancelPointTransaction(id, impUid, amount, currentUser) {
        amount *= -1;
        this.pointTransactionService.createPayment({ impUid, amount, currentUser });
        return this.pointTransactionService.cancelPayment({ id });
    }
};
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthAccessGuard),
    (0, graphql_1.Mutation)(() => pointTransaction_entity_1.PointTransaction),
    __param(0, (0, graphql_1.Args)('impUid')),
    __param(1, (0, graphql_1.Args)('amount')),
    __param(2, (0, gql_user_param_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], PointTransactionResolver.prototype, "createPointTransaction", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthAccessGuard),
    (0, graphql_1.Mutation)(() => pointTransaction_entity_1.PointTransaction),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('impUid')),
    __param(2, (0, graphql_1.Args)('amount')),
    __param(3, (0, gql_user_param_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Object]),
    __metadata("design:returntype", void 0)
], PointTransactionResolver.prototype, "cancelPointTransaction", null);
PointTransactionResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [pointTransaction_service_1.PointTransactionService,
        iamport_service_1.IamportService])
], PointTransactionResolver);
exports.PointTransactionResolver = PointTransactionResolver;
//# sourceMappingURL=pointTransaction.resolver.js.map