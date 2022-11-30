import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateWaiterDto } from './dto/create-waiter.dto';
import {
  UpdateWaiterBodyDto,
  UpdateWaiterQueryDto,
} from './dto/update-waiter.dto';
import { WaitersService } from './waiters.service';

@Controller('/api/waiters')
export class WaitersController {
  constructor(private readonly waitersService: WaitersService) {}

  @Post('/create')
  create(@Body() newWaiter: CreateWaiterDto) {
    return this.waitersService.create(newWaiter);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.waitersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.waitersService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/edit')
  update(
    @Query() { id }: UpdateWaiterQueryDto,
    @Body() updatedWaiter: UpdateWaiterBodyDto
  ) {
    return this.waitersService.update(id, updatedWaiter);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.waitersService.remove(id);
  }
}
