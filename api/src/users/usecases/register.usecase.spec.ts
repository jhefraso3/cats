import { Test, TestingModule } from "@nestjs/testing";
import { ConflictException } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { RegisterUseCase } from "./register.usecase";
import { UsersService } from "../users.service";
import { USERS_MESSAGES } from "../constants/users-messages.constants";

jest.mock("bcrypt");

describe("RegisterUseCase", () => {
  let useCase: RegisterUseCase;

  const mockUsersService = {
    findByUsername: jest.fn(),
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUseCase,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    useCase = module.get<RegisterUseCase>(RegisterUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should register user successfully", async () => {
    const input = {
      firstName: "Jhenifer",
      lastName: "Franco",
      username: "jhenifer",
      password: "123456",
    };

    const hashedPassword = "hashed-password";

    mockUsersService.findByUsername.mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
    mockUsersService.register.mockResolvedValue({
      id: "1",
      firstName: "Jhenifer",
      lastName: "Franco",
      username: "jhenifer",
    });

    const result = await useCase.executeRegister(input);

    expect(mockUsersService.findByUsername).toHaveBeenCalledWith("jhenifer");
    expect(bcrypt.hash).toHaveBeenCalledWith("123456", 10);

    expect(mockUsersService.register).toHaveBeenCalledWith({
      ...input,
      password: hashedPassword,
    });

    expect(result).toEqual({
      id: "1",
      firstName: "Jhenifer",
      lastName: "Franco",
      username: "jhenifer",
    });
  });

  it("should throw ConflictException if username already exists", async () => {
    mockUsersService.findByUsername.mockResolvedValue({
      id: "1",
      username: "jhenifer",
    });

    await expect(
      useCase.executeRegister({
        firstName: "Jhenifer",
        lastName: "Franco",
        username: "jhenifer",
        password: "123",
      }),
    ).rejects.toThrow(
      new ConflictException(USERS_MESSAGES.ERROR.FIND_USERNAME),
    );

    expect(mockUsersService.register).not.toHaveBeenCalled();
    expect(bcrypt.hash).not.toHaveBeenCalled();
  });

  it("should propagate error if register fails", async () => {
    mockUsersService.findByUsername.mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashed");

    mockUsersService.register.mockRejectedValue(
      new Error("DB error"),
    );

    await expect(
      useCase.executeRegister({
        firstName: "Jhenifer",
        lastName: "Franco",
        username: "jhenifer",
        password: "123",
      }),
    ).rejects.toThrow("DB error");
  });
});