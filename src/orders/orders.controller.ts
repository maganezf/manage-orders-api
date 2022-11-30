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
import { CreateOrderDto } from './dto/create-order.dto';
import {
  UpdateOrderBodyDto,
  UpdateOrderQueryDto,
} from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@Controller('/api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/create')
  create(@Body() newOrder: CreateOrderDto) {
    return this.ordersService.create(newOrder);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.ordersService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/edit')
  update(
    @Query() { id }: UpdateOrderQueryDto,
    @Body() updatedOrder: UpdateOrderBodyDto
  ) {
    return this.ordersService.update(id, updatedOrder);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.ordersService.remove(id);
  }
}
