"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var LoginUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUseCase = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const auth_messages_constants_1 = require("../constants/auth-messages.constants");
let LoginUseCase = LoginUseCase_1 = class LoginUseCase {
    usersServiceInterface;
    jwtService;
    logger = new common_1.Logger(LoginUseCase_1.name);
    constructor(usersServiceInterface, jwtService) {
        this.usersServiceInterface = usersServiceInterface;
        this.jwtService = jwtService;
    }
    async executeLogin(loginInput) {
        try {
            const user = await this.usersServiceInterface.findByUsername(loginInput.username);
            if (!user) {
                throw new common_1.HttpException(auth_messages_constants_1.AUTH_MESSAGES.ERROR.USER_NOT_FOUND, common_1.HttpStatus.UNAUTHORIZED);
            }
            const valid = await bcrypt.compare(loginInput.password, user.password);
            if (!valid) {
                throw new common_1.HttpException(auth_messages_constants_1.AUTH_MESSAGES.ERROR.WRONG_USER_PASSWORD, common_1.HttpStatus.UNAUTHORIZED);
            }
            const payload = {
                id: user.id,
            };
            return {
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                },
                token: this.jwtService.sign(payload),
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            this.logger.error(auth_messages_constants_1.AUTH_MESSAGES.ERROR.EXECUTION_ERROR, error);
            throw new common_1.HttpException(auth_messages_constants_1.AUTH_MESSAGES.ERROR.INTERNAL_SERVER, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.LoginUseCase = LoginUseCase;
exports.LoginUseCase = LoginUseCase = LoginUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("IUsersServicePort")),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], LoginUseCase);
//# sourceMappingURL=login.usecase.js.map