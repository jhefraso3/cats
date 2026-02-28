import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { HttpException, HttpStatus } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { UsersService } from "./users.service";
import { Users } from "./schemas/users-schema.schema";
import { USERS_MESSAGES } from "./constants/users-messages.constants";

jest.mock("bcrypt");

describe("UsersService", () => {
  let service: UsersService;
  let model: any;

  const mockUserModel = {
    create: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(Users.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get(getModelToken(Users.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("should hash password and create user successfully", async () => {
      const userInput = {
        firstName: "Juan",
        lastName: "Perez",
        username: "juanp",
        password: "123456",
      };

      const hashedPassword = "hashed_password";

      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      const createdUser = {
        id: "1",
        firstName: "Juan",
        lastName: "Perez",
        username: "juanp",
        password: hashedPassword,
      };

      model.create.mockResolvedValue(createdUser);

      const result = await service.register(userInput);

      expect(bcrypt.hash).toHaveBeenCalledWith("123456", 10);
      expect(model.create).toHaveBeenCalledWith({
        ...userInput,
        password: hashedPassword,
      });

      expect(result).toEqual({
        id: "1",
        firstName: "Juan",
        lastName: "Perez",
        username: "juanp",
      });
    });

    it("should throw HttpException when create fails", async () => {
      model.create.mockRejectedValue(new Error("DB Error"));

      await expect(
        service.register({ username: "fail" }),
      ).rejects.toThrow(
        new HttpException(
          USERS_MESSAGES.ERROR.CREATE,
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });

  describe("findByUsername", () => {
    it("should return user when found", async () => {
      const user = { id: "1", username: "juanp" };

      model.findOne.mockResolvedValue(user);

      const result = await service.findByUsername("juanp");

      expect(model.findOne).toHaveBeenCalledWith({ username: "juanp" });
      expect(result).toEqual(user);
    });

    it("should return null when user not found", async () => {
      model.findOne.mockResolvedValue(null);

      const result = await service.findByUsername("unknown");

      expect(result).toBeNull();
    });

    it("should throw HttpException on database error", async () => {
      model.findOne.mockRejectedValue(new Error("DB Error"));

      await expect(
        service.findByUsername("juanp"),
      ).rejects.toThrow(
        new HttpException(
          USERS_MESSAGES.ERROR.GET_USER_INFO,
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });
});