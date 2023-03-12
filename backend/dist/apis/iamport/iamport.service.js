"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IamportService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let IamportService = class IamportService {
    async getToken() {
        try {
            const result = await axios_1.default.post('https://api.iamport.kr/users/getToken', {
                imp_key: process.env.IAMPORT_KEY,
                imp_secret: process.env.IAMPORT_SECRET,
            });
            return result.data.response.access_token;
        }
        catch (error) {
            throw new common_1.HttpException(error.response.data.message, error.response.status);
        }
    }
    async hasPayment({ impUid, token }) {
        var _a, _b;
        try {
            const result = await (0, axios_1.default)({
                url: `https://api.iamport.kr/payments/${impUid}`,
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (result.data.response.status !== 'paid') {
                throw new common_1.UnprocessableEntityException('유효하지 않은 결제입니다.');
            }
        }
        catch (error) {
            if ((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) {
                throw new common_1.HttpException(error.response.data.message, error.response.status);
            }
            else {
                throw error;
            }
        }
    }
};
IamportService = __decorate([
    (0, common_1.Injectable)()
], IamportService);
exports.IamportService = IamportService;
//# sourceMappingURL=iamport.service.js.map