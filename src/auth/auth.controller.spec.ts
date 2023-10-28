import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { WaitersService } from '../waiters/waiters.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: WaitersService,
          useValue: {
            findOneByUsername: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('should return a token on login', async () => {
    const mockUser: LoginRequest = { user: { id: 1, username: 'testuser' } };

    jest.spyOn(authService, 'login').mockImplementation(() => {
      return Promise.resolve({
        message: 'Login made successfully',
        data: { token: 'generated-token' },
      });
    });
    const result = await authController.login(mockUser);
    expect(result).toHaveProperty('data');
    expect(result.data).toHaveProperty('token', 'generated-token');
  });
});
