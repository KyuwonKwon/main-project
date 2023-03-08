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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const productAllergy_entity_1 = require("../productsAllergy/entities/productAllergy.entity");
const productImage_entity_1 = require("../productsImages/entities/productImage.entity");
const productMainCategory_entity_1 = require("../productsMainCategory/entities/productMainCategory.entity");
const productNutritionFacts_entity_1 = require("../productsNutritionFatcts/entities/productNutritionFacts.entity");
const productSubCategory_entity_1 = require("../productsSubCategory/entities/productSubCategory.entity");
const product_entity_1 = require("./entities/product.entity");
let ProductService = class ProductService {
    constructor(productRepository, productImageRepository, productAllergyRepository, productSubCategoryRepository, productMainCategoryRepository, productNutritionFactsRepository) {
        this.productRepository = productRepository;
        this.productImageRepository = productImageRepository;
        this.productAllergyRepository = productAllergyRepository;
        this.productSubCategoryRepository = productSubCategoryRepository;
        this.productMainCategoryRepository = productMainCategoryRepository;
        this.productNutritionFactsRepository = productNutritionFactsRepository;
    }
    async findAll() {
        return await this.productRepository.find({
            relations: [
                'productImage',
                'productAllergies',
                'productSubCategory',
                'productNutritionFacts',
            ],
        });
    }
    async findAllwithDel() {
        return await this.productRepository.find({
            withDeleted: true,
            relations: [
                'productImage',
                'productAllergies',
                'productSubCategory',
                'productNutritionFacts',
            ],
        });
    }
    async findOne({ productId }) {
        return await this.productRepository.findOne({
            where: { id: productId },
            relations: [
                'productImage',
                'productAllergies',
                'productSubCategory',
                'productNutritionFacts',
            ],
        });
    }
    async create({ createProductInput }) {
        const { productImageInput, productAllergies, productSubCategoryInput, productNutritionFactsInput } = createProductInput, product = __rest(createProductInput, ["productImageInput", "productAllergies", "productSubCategoryInput", "productNutritionFactsInput"]);
        const result = await this.productNutritionFactsRepository.save(Object.assign({}, productNutritionFactsInput));
        const result2 = await this.productImageRepository.save(Object.assign({}, productImageInput));
        const result3 = [];
        for (let i = 0; i < productAllergies.length; i++) {
            const allergyName = productAllergies[i];
            const prevAllergy = await this.productAllergyRepository.findOne({
                name: allergyName,
            });
            if (prevAllergy) {
                result3.push(prevAllergy);
            }
            else {
                const newAllergy = await this.productAllergyRepository.save({
                    name: allergyName,
                });
                result3.push(newAllergy);
            }
        }
        let result4;
        const { name, productMainCategoryName } = productSubCategoryInput;
        const prevMainCategory = await this.productMainCategoryRepository.findOne({
            name: productMainCategoryName,
        });
        if (prevMainCategory) {
            const prevSubCategory = await this.productSubCategoryRepository.findOne({
                where: { name: name },
                relations: ['productMainCategory'],
            });
            if (prevSubCategory) {
                result4 = prevSubCategory;
            }
            else {
                result4 = await this.productSubCategoryRepository.save({
                    name: name,
                    productMainCategory: prevMainCategory,
                });
            }
        }
        else {
            const productMainCategory = await this.productMainCategoryRepository.save({
                name: productMainCategoryName,
            });
            result4 = await this.productSubCategoryRepository.save({
                name: name,
                productMainCategory: productMainCategory,
            });
        }
        const result5 = await this.productRepository.save(Object.assign(Object.assign({}, product), { productNutritionFacts: result, productImage: result2, productAllergies: result3, productSubCategory: result4 }));
        return result5;
    }
    async update({ productId, updateProductInput }) {
        const myproduct = await this.productRepository.findOne({
            where: { id: productId },
        });
        const newProduct = Object.assign(Object.assign({}, myproduct), updateProductInput);
        return await this.productRepository.save(newProduct);
    }
    async checkSoldout({ productId }) {
        const product = await this.productRepository.findOne({
            where: { id: productId },
        });
        if (product.stock < 1)
            throw new common_1.UnprocessableEntityException('이미 판매 완료된 상품입니다.');
    }
    async delete({ productId }) {
        const result = await this.productRepository.softDelete({ id: productId });
        return result.affected ? true : false;
    }
    async restore({ productId }) {
        const result = await this.productRepository.restore({ id: productId });
        return result.affected ? true : false;
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(productImage_entity_1.ProductImage)),
    __param(2, (0, typeorm_1.InjectRepository)(productAllergy_entity_1.ProductAllergy)),
    __param(3, (0, typeorm_1.InjectRepository)(productSubCategory_entity_1.ProductSubCategory)),
    __param(4, (0, typeorm_1.InjectRepository)(productMainCategory_entity_1.ProductMainCategory)),
    __param(5, (0, typeorm_1.InjectRepository)(productNutritionFacts_entity_1.ProductNutritionFacts)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _e : Object, typeof (_f = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _f : Object])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map