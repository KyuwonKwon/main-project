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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const userAddress_entity_1 = require("../usersAddress/entities/userAddress.entity");
const userPurchaseItem_entity_1 = require("../usersPurchaseItem/entities/userPurchaseItem.entity");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userRepository, userAddrssRepository, userPurchaseItemRepository) {
        this.userRepository = userRepository;
        this.userAddrssRepository = userAddrssRepository;
        this.userPurchaseItemRepository = userPurchaseItemRepository;
    }
    async findOne({ logId }) {
        return await this.userRepository.findOne({
            where: { logId },
        });
    }
    async findAll() {
        return await this.userRepository.find({});
    }
    async findAllWithDel() {
        return await this.userRepository.find({
            withDeleted: true,
        });
    }
    async createUser({ createUserInput }) {
        const { logId } = createUserInput;
        const prevUser = await this.userRepository.findOne({
            where: { logId },
        });
        if (prevUser) {
            throw new common_1.UnprocessableEntityException('이미 가입된 계정이 있습니다.');
        }
        else {
            const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
            const hasedPersonal = await bcrypt.hash(createUserInput.personal, 10);
            createUserInput = Object.assign(Object.assign({}, createUserInput), { password: hashedPassword, personal: hasedPersonal });
            const _a = await this.userRepository.save(createUserInput), { password } = _a, newUser = __rest(_a, ["password"]);
            return newUser;
        }
    }
    async updateUser({ userId, updateUserInput }) {
        const myuser = await this.userRepository.findOne({
            where: { id: userId },
        });
        const newUser = Object.assign(Object.assign({}, myuser), updateUserInput);
        return await this.userRepository.save(newUser);
    }
    async createUserAddress({ userId, createUserAddressInput }) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        return await this.userAddrssRepository.save(Object.assign(Object.assign({}, createUserAddressInput), { user: user }));
    }
    async delete({ userId }) {
        const result = await this.userRepository.softDelete({ id: userId });
        return result.affected ? true : false;
    }
    async restore({ userId }) {
        const result = await this.userRepository.restore({ id: userId });
        return result.affected ? true : false;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(userAddress_entity_1.UserAddress)),
    __param(2, (0, typeorm_1.InjectRepository)(userPurchaseItem_entity_1.UserPurchaseItem)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map