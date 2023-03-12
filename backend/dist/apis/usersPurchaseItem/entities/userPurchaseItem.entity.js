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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPurchaseItem = void 0;
const graphql_1 = require("@nestjs/graphql");
const product_entity_1 = require("../../products/entities/product.entity");
const userOrderlist_entity_1 = require("../../usersOrderlist/entities/userOrderlist.entity");
const typeorm_1 = require("typeorm");
let UserPurchaseItem = class UserPurchaseItem {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], UserPurchaseItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], UserPurchaseItem.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.OneToOne)(() => product_entity_1.Product),
    (0, graphql_1.Field)(() => product_entity_1.Product),
    __metadata("design:type", product_entity_1.Product)
], UserPurchaseItem.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => userOrderlist_entity_1.UserOrderlist),
    (0, graphql_1.Field)(() => userOrderlist_entity_1.UserOrderlist),
    __metadata("design:type", userOrderlist_entity_1.UserOrderlist)
], UserPurchaseItem.prototype, "userOrderlist", void 0);
UserPurchaseItem = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], UserPurchaseItem);
exports.UserPurchaseItem = UserPurchaseItem;
//# sourceMappingURL=userPurchaseItem.entity.js.map