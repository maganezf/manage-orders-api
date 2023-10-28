import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { WaiterDto } from '../waiters/dto/waiter.dto';
import { WaitersService } from '../waiters/waiters.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let waitersService: WaitersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    authService = module.get<AuthService>(AuthService);
    waitersService = module.get<WaitersService>(WaitersService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should validate user credentials', async () => {
    const mockWaiter: WaiterDto = {
      id: 'user-id',
      username: 'testuser',
      password: 'password123',
    };
    jest.spyOn(waitersService, 'findOneByUsername').mockImplementation(() => {
      return Promise.resolve(mockWaiter);
    });

    jest
      .spyOn(authService, 'validateUser')
      .mockImplementation(async (username, password) => {
        if (username === 'testuser' && password === 'password123') {
          return mockWaiter;
        } else {
          return null;
        }
      });

    const result = await authService.validateUser('testuser', 'password123');
    expect(result).toEqual(mockWaiter);
  });

  it('should return null for invalid user credentials', async () => {
    jest.spyOn(waitersService, 'findOneByUsername').mockImplementation(() => {
      return Promise.resolve(null);
    });

    const result = await authService.validateUser(
      'invaliduser',
      'invalidpassword'
    );
    expect(result).toBeNull();
  });
});
