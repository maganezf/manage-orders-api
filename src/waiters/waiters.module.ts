import { Module } from '@nestjs/common';
import { WaitersController } from './waiters.controller';
import { WaitersService } from './waiters.service';

@Module({
  controllers: [WaitersController],
  providers: [WaitersService],
})
export class WaitersModule {}
