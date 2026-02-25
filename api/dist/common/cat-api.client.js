"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.catApi = void 0;
const axios_1 = __importDefault(require("axios"));
exports.catApi = axios_1.default.create({
    baseURL: 'https://api.thecatapi.com/v1',
    headers: {
        'x-api-key': process.env.CAT_API_KEY,
    },
});
//# sourceMappingURL=cat-api.client.js.map