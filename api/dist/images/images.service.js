"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ImagesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesService = void 0;
const common_1 = require("@nestjs/common");
const cat_api_client_1 = require("../common/cat-api.client");
const images_messages_constants_1 = require("./constants/images-messages.constants");
let ImagesService = ImagesService_1 = class ImagesService {
    logger = new common_1.Logger(ImagesService_1.name);
    getImagesByBreedId(breedId) {
        try {
            return cat_api_client_1.catApi
                .get(`/images/search?limit=10&breed_ids=${breedId}`)
                .then((r) => r.data);
        }
        catch (err) {
            this.logger.error(err);
            throw new common_1.HttpException(images_messages_constants_1.IMAGES_MESSAGES.ERROR.GET_IMAGES, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ImagesService = ImagesService;
exports.ImagesService = ImagesService = ImagesService_1 = __decorate([
    (0, common_1.Injectable)()
], ImagesService);
//# sourceMappingURL=images.service.js.map