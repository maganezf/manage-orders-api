import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ResponseDto } from '../@types';
import { CreateWaiterDto } from './dto/create-waiter.dto';
import { WaiterEntity } from './entities/waiter.entity';
import { WaitersService } from './waiters.service';

describe('WaitersService', () => {
  let waitersService: WaitersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WaitersService,
        {
          provide: getRepositoryToken(WaiterEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    waitersService = module.get<WaitersService>(WaitersService);
  });

  it('should be defined', () => {
    expect(waitersService).toBeDefined();
  });

  it('should be defined', () => {
    expect(waitersService).toBeDefined();
  });

  it('should create a new waiter', async () => {
    const newWaiter: CreateWaiterDto = {
      username: 'new-waiter-1',
      password: '123',
    };

    const expectedNewWaiterResponse: ResponseDto<WaiterEntity> = {
      message: 'success on create new waiter',
      data: {
        id: 'waiter-id',
        username: 'new-waiter',
        password: '123',
        hashPassword: undefined,
      },
    };

    jest
      .spyOn(waitersService, 'create')
      .mockResolvedValue(expectedNewWaiterResponse);

    const result = await waitersService.create(newWaiter);
    expect(result).toEqual(expectedNewWaiterResponse);
  });

  it('should find all waiters', async () => {
    const expectedWaitersResponse: ResponseDto<WaiterEntity[]> = {
      message: 'Success on finding all Waiters',
      data: [
        {
          id: 'waiter-id-1',
          username: 'new-waiter-1',
          password: '123',
          hashPassword: undefined,
        },
        {
          id: 'waiter-id-2',
          username: 'new-waiter-2',
          password: '123',
          hashPassword: undefined,
        },
      ],
    };

    jest
      .spyOn(waitersService, 'findAll')
      .mockResolvedValue(expectedWaitersResponse);

    const result = await waitersService.findAll();
    expect(result).toEqual(expectedWaitersResponse);
  });

  it('should find a waiter by ID', async () => {
    const waiterId = 'waiter-id-1';
    const expectedWaiterResponse: ResponseDto<WaiterEntity> = {
      message: 'Success on finding waiter by ID',
      data: {
        id: 'waiter-id-1',
        username: 'new-waiter-1',
        password: '123',
        hashPassword: undefined,
      },
    };

    jest
      .spyOn(waitersService, 'findOne')
      .mockResolvedValue(expectedWaiterResponse);

    const result = await waitersService.findOne(waiterId);
    expect(result).toEqual(expectedWaiterResponse);
  });

  it('should update a waiter', async () => {
    const waiterId = 'waiter-id-1';
    const updatedWaiter: WaiterEntity = {
      id: 'updated-waiter-id-1',
      username: 'updated-new-waiter-1',
      password: 'updated-123',
      hashPassword: undefined,
    };

    const expectedUpdatedWaiterResponse: ResponseDto<Partial<WaiterEntity>> = {
      message: 'Success on updating waiter',
      data: updatedWaiter,
    };

    jest
      .spyOn(waitersService, 'update')
      .mockResolvedValue(expectedUpdatedWaiterResponse);

    const result = await waitersService.update(waiterId, updatedWaiter);
    expect(result).toEqual(expectedUpdatedWaiterResponse);
  });

  it('should remove a waiter by ID', async () => {
    const waiterId = 'waiter-id-1';
    const expectedRemoveWaiterResponse: ResponseDto<WaiterEntity[]> = {
      message: 'Success on removing waiter by ID',
      data: [
        {
          id: 'waiter-id-2',
          username: 'new-waiter-2',
          password: '123',
          hashPassword: undefined,
        },
      ],
    };

    jest
      .spyOn(waitersService, 'remove')
      .mockResolvedValue(expectedRemoveWaiterResponse);

    const result = await waitersService.remove(waiterId);
    expect(result).toEqual(expectedRemoveWaiterResponse);
  });
});
