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
exports.CreateProductInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const productImage_input_1 = require("../../productsImages/dto/productImage.input");
const productNutritionFacts_input_1 = require("../../productsNutritionFatcts/dto/productNutritionFacts.input");
const productSubCategory_input_1 = require("../../productsSubCategory/dto/productSubCategory.input");
let CreateProductInput = class CreateProductInput {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateProductInput.prototype, "koName", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateProductInput.prototype, "enName", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CreateProductInput.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.Min)(0),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CreateProductInput.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], CreateProductInput.prototype, "isNew", void 0);
__decorate([
    (0, class_validator_1.Min)(0),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CreateProductInput.prototype, "stock", void 0);
__decorate([
    (0, graphql_1.Field)(() => productNutritionFacts_input_1.ProductNutritionFactsInput),
    __metadata("design:type", productNutritionFacts_input_1.ProductNutritionFactsInput)
], CreateProductInput.prototype, "productNutritionFactsInput", void 0);
__decorate([
    (0, graphql_1.Field)(() => productSubCategory_input_1.ProductSubCategoryInput),
    __metadata("design:type", productSubCategory_input_1.ProductSubCategoryInput)
], CreateProductInput.prototype, "productSubCategoryInput", void 0);
__decorate([
    (0, graphql_1.Field)(() => productImage_input_1.ProductImageInput),
    __metadata("design:type", productImage_input_1.ProductImageInput)
], CreateProductInput.prototype, "productImageInput", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], CreateProductInput.prototype, "productAllergies", void 0);
CreateProductInput = __decorate([
    (0, graphql_1.InputType)()
], CreateProductInput);
exports.CreateProductInput = CreateProductInput;
//# sourceMappingURL=createProduct.input.js.map