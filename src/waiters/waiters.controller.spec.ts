import { Test, TestingModule } from '@nestjs/testing';
import { WaitersController } from './waiters.controller';
import { WaitersService } from './waiters.service';

describe('WaitersController', () => {
  let controller: WaitersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaitersController],
      providers: [WaitersService],
    }).compile();

    controller = module.get<WaitersController>(WaitersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
