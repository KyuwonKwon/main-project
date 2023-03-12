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
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const userAddress_input_1 = require("../usersAddress/dto/userAddress.input");
const createUser_input_1 = require("./dto/createUser.input");
const user_entity_1 = require("./entities/user.entity");
const user_service_1 = require("./user.service");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    fetchUsers() {
        return this.userService.findAll();
    }
    fetchUsersWithDeleted() {
        return this.userService.findAllWithDel();
    }
    async createUser(createUserInput) {
        return this.userService.createUser({ createUserInput });
    }
    createUserAddress(userId, createUserAddressInput) {
        return this.userService.createUserAddress({
            userId,
            createUserAddressInput,
        });
    }
    restoreUser(userId) {
        return this.userService.restore({ userId });
    }
};
__decorate([
    (0, graphql_1.Query)(() => [user_entity_1.UserWithoutPw]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "fetchUsers", null);
__decorate([
    (0, graphql_1.Query)(() => [user_entity_1.UserWithoutPw]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "fetchUsersWithDeleted", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.UserWithoutPw),
    __param(0, (0, graphql_1.Args)('createUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUser_input_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.UserWithoutPw),
    __param(0, (0, graphql_1.Args)('userId')),
    __param(1, (0, graphql_1.Args)('createUserAddressInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, userAddress_input_1.CreateUserAddressInput]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "createUserAddress", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "restoreUser", null);
UserResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map