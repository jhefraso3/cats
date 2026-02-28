import { Test, TestingModule } from "@nestjs/testing";
import { HttpException, HttpStatus } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

import { LoginUseCase } from "./login.usecase";
import { AUTH_MESSAGES } from "../constants/auth-messages.constants";

jest.mock("bcrypt");

describe("LoginUseCase", () => {
  let useCase: LoginUseCase;

  const mockUsersService = {
    findByUsername: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginUseCase,
        {
          provide: "IUsersServicePort",
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    useCase = module.get<LoginUseCase>(LoginUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should login successfully", async () => {
    const input = {
      username: "jhenifer",
      password: "123456",
    };

    const user = {
      id: "1",
      username: "jhenifer",
      password: "hashed",
      firstName: "Jhenifer",
      lastName: "Franco",
    };

    mockUsersService.findByUsername.mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    mockJwtService.sign.mockReturnValue("jwt_token");

    const result = await useCase.executeLogin(input);

    expect(mockUsersService.findByUsername).toHaveBeenCalledWith("jhenifer");
    expect(bcrypt.compare).toHaveBeenCalledWith("123456", "hashed");
    expect(mockJwtService.sign).toHaveBeenCalledWith({ id: "1" });

    expect(result).toEqual({
      user: {
        firstName: "Jhenifer",
        lastName: "Franco",
        username: "jhenifer",
      },
      token: "jwt_token",
    });
  });

  it("should throw USER_NOT_FOUND when user does not exist", async () => {
    mockUsersService.findByUsername.mockResolvedValue(null);

    await expect(
      useCase.executeLogin({ username: "no-user", password: "123" }),
    ).rejects.toThrow(
      new HttpException(
        AUTH_MESSAGES.ERROR.USER_NOT_FOUND,
        HttpStatus.UNAUTHORIZED,
      ),
    );
  });

  it("should throw WRONG_USER_PASSWORD when password is invalid", async () => {
    mockUsersService.findByUsername.mockResolvedValue({
      id: "1",
      password: "hashed",
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      useCase.executeLogin({ username: "jhenifer", password: "wrong" }),
    ).rejects.toThrow(
      new HttpException(
        AUTH_MESSAGES.ERROR.WRONG_USER_PASSWORD,
        HttpStatus.UNAUTHORIZED,
      ),
    );
  });

  it("should throw INTERNAL_SERVER when unexpected error occurs", async () => {
    mockUsersService.findByUsername.mockRejectedValue(
      new Error("DB error"),
    );

    await expect(
      useCase.executeLogin({ username: "jhenifer", password: "123" }),
    ).rejects.toThrow(
      new HttpException(
        AUTH_MESSAGES.ERROR.INTERNAL_SERVER,
        HttpStatus.INTERNAL_SERVER_ERROR,
      ),
    );
  });
});