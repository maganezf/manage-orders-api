import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaiterEntity } from './entities/waiter.entity';
import { WaitersController } from './waiters.controller';
import { WaitersService } from './waiters.service';

@Module({
  imports: [TypeOrmModule.forFeature([WaiterEntity])],
  controllers: [WaitersController],
  providers: [WaitersService],
  exports: [WaitersService],
})
export class WaitersModule {}
