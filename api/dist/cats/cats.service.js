"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatsService = void 0;
const common_1 = require("@nestjs/common");
const cat_api_client_1 = require("../common/cat-api.client");
let CatsService = class CatsService {
    getBreeds() {
        return cat_api_client_1.catApi.get('/breeds').then(r => r.data);
    }
    getBreedById(id) {
        return cat_api_client_1.catApi.get(`/breeds/${id}`).then(r => r.data);
    }
    searchBreeds(query) {
        return cat_api_client_1.catApi.get(`/breeds/search?q=${query}`).then(r => r.data);
    }
};
exports.CatsService = CatsService;
exports.CatsService = CatsService = __decorate([
    (0, common_1.Injectable)()
], CatsService);
//# sourceMappingURL=cats.service.js.map