import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { RegisterUseCase } from '../usecases/register.usecase';
import { CreateUserDto } from '../dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let registerUseCase: RegisterUseCase;

  const mockRegisterUseCase = {
    executeRegister: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: RegisterUseCase,
          useValue: mockRegisterUseCase,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    registerUseCase = module.get<RegisterUseCase>(RegisterUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should call executeRegister and return result', async () => {
      const dto: CreateUserDto = {
        firstName: 'Test',
        lastName: 'User',
        username: 'testuser',
        password: '123456',
      };

      const mockResponse = {
        id: '1',
        firstName: 'Test',
        lastName: 'User',
        username: 'testuser',
        email: 'test@mail.com',
      };

      mockRegisterUseCase.executeRegister.mockResolvedValue(mockResponse);

      const result = await controller.register(dto);

      expect(registerUseCase.executeRegister).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockResponse);
    });

    it('should throw error if registerUseCase throws', async () => {
      const dto: CreateUserDto = {
        firstName: 'Test',
        lastName: 'User',
        username: 'testuser',
        password: '123456',
      };

      mockRegisterUseCase.executeRegister.mockRejectedValue(
        new Error('Create error'),
      );

      await expect(controller.register(dto)).rejects.toThrow();
    });
  });
});