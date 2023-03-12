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
exports.Product = void 0;
const productSubCategory_entity_1 = require("../../productsSubCategory/entities/productSubCategory.entity");
const productAllergy_entity_1 = require("../../productsAllergy/entities/productAllergy.entity");
const productNutritionFacts_entity_1 = require("../../productsNutritionFatcts/entities/productNutritionFacts.entity");
const productImage_entity_1 = require("../../productsImages/entities/productImage.entity");
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
let Product = class Product {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Product.prototype, "koName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Product.prototype, "enName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], Product.prototype, "isNew", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.OneToOne)(() => productNutritionFacts_entity_1.ProductNutritionFacts),
    (0, graphql_1.Field)(() => productNutritionFacts_entity_1.ProductNutritionFacts),
    __metadata("design:type", productNutritionFacts_entity_1.ProductNutritionFacts)
], Product.prototype, "productNutritionFacts", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => productSubCategory_entity_1.ProductSubCategory),
    (0, graphql_1.Field)(() => productSubCategory_entity_1.ProductSubCategory),
    __metadata("design:type", productSubCategory_entity_1.ProductSubCategory)
], Product.prototype, "productSubCategory", void 0);
__decorate([
    (0, typeorm_1.JoinTable)(),
    (0, typeorm_1.ManyToMany)(() => productAllergy_entity_1.ProductAllergy, (productAllergy) => productAllergy.products),
    (0, graphql_1.Field)(() => [productAllergy_entity_1.ProductAllergy]),
    __metadata("design:type", Array)
], Product.prototype, "productAllergies", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.OneToOne)(() => productImage_entity_1.ProductImage),
    (0, graphql_1.Field)(() => productImage_entity_1.ProductImage),
    __metadata("design:type", productImage_entity_1.ProductImage)
], Product.prototype, "productImage", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Product.prototype, "deletedAt", void 0);
Product = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], Product);
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map