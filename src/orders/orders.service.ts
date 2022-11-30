import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { ResponseDto } from '../@types';
import { OrderEntity } from '../orders/entities/order.entity';
import type { CreateOrderDto } from './dto/create-order.dto';
import type { OrderDto } from './dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>
  ) {}

  async create(order: CreateOrderDto): Promise<ResponseDto<OrderEntity>> {
    const newOrder = this.ordersRepository.create(order);
    await this.ordersRepository.save(newOrder);

    return {
      message: `The order from the customer '${newOrder.customerName}' was created successfully`,
      data: newOrder,
    };
  }

  async findAll(): Promise<ResponseDto<OrderDto[]>> {
    const data = await this.ordersRepository.find();

    return {
      message: 'Got all orders successfully',
      data,
    };
  }

  async findOne(id: string): Promise<ResponseDto<OrderDto>> {
    const order = await this.ordersRepository.findOneBy({ id });

    if (!order?.id) {
      throw new HttpException(
        "This order doesn't exists in the database",
        HttpStatus.NOT_FOUND
      );
    }

    return {
      message: `The order with the id: '${id}' was got successfully`,
      data: order,
    };
  }

  async update(
    id: string,
    updatedOrder: Partial<OrderDto>
  ): Promise<ResponseDto<Partial<OrderDto>>> {
    const oldOrder = await this.ordersRepository.findOneBy({
      id,
    });

    if (!oldOrder?.id) {
      throw new HttpException(
        "This order doesn't exists in the database",
        HttpStatus.NOT_FOUND
      );
    }

    const order = { ...oldOrder, ...updatedOrder };

    await this.ordersRepository.save(order);

    return {
      message: `The order was updated successfully`,
      data: order,
    };
  }

  async remove(id: string): Promise<ResponseDto<OrderDto[]>> {
    const order = await this.ordersRepository.findOneBy({ id });

    if (!order) {
      throw new HttpException(
        "This order doesn't exists in the database",
        HttpStatus.NOT_FOUND
      );
    }

    await this.ordersRepository.remove(order);

    const data = await this.ordersRepository.find();

    return {
      message: `The order with the id: '${id}' was removed successfully`,
      data,
    };
  }
}
