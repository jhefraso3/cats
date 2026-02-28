import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { LoginUseCase } from '../usecases/login.usecase';
import { LoginDto } from '../dto/login.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let loginUseCase: LoginUseCase;

  const mockLoginUseCase = {
    executeLogin: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: LoginUseCase,
          useValue: mockLoginUseCase,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    loginUseCase = module.get<LoginUseCase>(LoginUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call executeLogin and return result', async () => {
    const loginDto: LoginDto = {
      username: 'testuser',
      password: '123456',
    };

    const mockResponse = {
      user: {
        firstName: 'Test',
        lastName: 'User',
        username: 'testuser',
      },
      token: 'fake-jwt-token',
    };

    mockLoginUseCase.executeLogin.mockResolvedValue(mockResponse);

    const result = await controller.login(loginDto);

    expect(loginUseCase.executeLogin).toHaveBeenCalledWith(loginDto);
    expect(result).toEqual(mockResponse);
  });

  it('should throw error if loginUseCase throws', async () => {
    const loginDto: LoginDto = {
      username: 'testuser',
      password: 'wrong',
    };

    mockLoginUseCase.executeLogin.mockRejectedValue(
      new Error('Unauthorized'),
    );

    await expect(controller.login(loginDto)).rejects.toThrow();
  });
});