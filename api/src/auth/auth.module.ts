import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService, ConfigModule } from "@nestjs/config";
import { AuthService } from "./auth.service";
import { AuthController } from "./controllers/auth.controller";
import { UsersModule } from "../users/users.module";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UsersService } from "src/users/users.service";
import { PassportModule } from "@nestjs/passport";
import { LoginUseCase } from "./usecases/login.usecase";

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule, UsersModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get("JWT_SECRET"),
        signOptions: { expiresIn: "1h" },
      }),
    }),
  ],
  providers: [
    JwtStrategy,
    AuthService,
    LoginUseCase,
    {
      provide: "IUsersServicePort",
      useClass: UsersService,
    },
  ],
  controllers: [AuthController],
  exports: [PassportModule],
})
export class AuthModule {}
