import { Test, TestingModule } from '@nestjs/testing';
import { WaitersService } from './waiters.service';

describe('WaitersService', () => {
  let service: WaitersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaitersService],
    }).compile();

    service = module.get<WaitersService>(WaitersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
