"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CatsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatsService = void 0;
const common_1 = require("@nestjs/common");
const cat_api_client_1 = require("../common/cat-api.client");
const cats_messages_constants_1 = require("./constants/cats-messages.constants");
let CatsService = CatsService_1 = class CatsService {
    logger = new common_1.Logger(CatsService_1.name);
    async getBreeds() {
        try {
            const { data } = await cat_api_client_1.catApi.get("/breeds");
            return data;
        }
        catch (err) {
            this.logger.error(err);
            throw new common_1.HttpException(cats_messages_constants_1.CATS_MESSAGES.ERROR.GET_BREEDS, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getBreedById(id) {
        try {
            const { data } = await cat_api_client_1.catApi.get(`/breeds/${id}`);
            return data;
        }
        catch (err) {
            this.logger.error(err);
            throw new common_1.HttpException(cats_messages_constants_1.CATS_MESSAGES.ERROR.GET_BREED_BY_ID, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async searchBreeds(query) {
        try {
            const { data } = await cat_api_client_1.catApi.get(`/breeds/search?q=${query}`);
            return data;
        }
        catch (err) {
            this.logger.error(err);
            throw new common_1.HttpException(cats_messages_constants_1.CATS_MESSAGES.ERROR.SEARCH, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.CatsService = CatsService;
exports.CatsService = CatsService = CatsService_1 = __decorate([
    (0, common_1.Injectable)()
], CatsService);
//# sourceMappingURL=cats.service.js.map