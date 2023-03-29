import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { ResponseDto } from '../@types';
import { WaiterEntity } from '../waiters/entities/waiter.entity';
import type { CreateWaiterDto } from './dto/create-waiter.dto';
import type { WaiterDto } from './dto/waiter.dto';

@Injectable()
export class WaitersService {
  constructor(
    @InjectRepository(WaiterEntity)
    private readonly waitersRepository: Repository<WaiterEntity>
  ) {}

  async create(waiter: CreateWaiterDto): Promise<ResponseDto<WaiterEntity>> {
    const waiters = await this.waitersRepository.find();
    const newWaiter = this.waitersRepository.create(waiter);

    if (waiters.some(waiter => waiter.username === newWaiter.username)) {
      throw new HttpException(
        'Already exists one waiter with this username',
        HttpStatus.NOT_ACCEPTABLE
      );
    }

    await this.waitersRepository.save(newWaiter);

    return {
      message: `The waiter '${newWaiter.username}' was created successfully`,
      data: newWaiter,
    };
  }

  async findAll(): Promise<ResponseDto<WaiterDto[]>> {
    const data = await this.waitersRepository.find();

    return {
      message: 'Got all waiters successfully',
      data,
    };
  }

  async findOne(id: string): Promise<ResponseDto<WaiterDto>> {
    const waiter = await this.waitersRepository.findOneBy({ id });

    if (!waiter?.id) {
      throw new HttpException(
        "This waiter doesn't exists in the database",
        HttpStatus.NOT_FOUND
      );
    }

    return {
      message: `The waiter with the id: '${id}' was got successfully`,
      data: waiter,
    };
  }

  async findOneByUsername(username: string): Promise<WaiterDto> {
    const waiter = await this.waitersRepository.findOneBy({ username });

    if (!waiter?.username) {
      throw new HttpException(
        "This user doesn't exists in the database",
        HttpStatus.NOT_FOUND
      );
    }

    return waiter;
  }

  async update(
    id: string,
    updatedWaiter: Partial<WaiterDto>
  ): Promise<ResponseDto<Partial<WaiterDto>>> {
    const oldWaiter = await this.waitersRepository.findOneBy({
      id,
    });

    if (!oldWaiter?.id) {
      throw new HttpException(
        "This waiter doesn't exists in the database",
        HttpStatus.NOT_FOUND
      );
    }

    const waiter = { ...oldWaiter, ...updatedWaiter };

    await this.waitersRepository.save(waiter);

    return {
      message: `The waiter was updated successfully`,
      data: waiter,
    };
  }

  async remove(id: string): Promise<ResponseDto<WaiterDto[]>> {
    const waiter = await this.waitersRepository.findOneBy({ id });

    if (!waiter) {
      throw new HttpException(
        "This waiter doesn't exists in the database",
        HttpStatus.NOT_FOUND
      );
    }

    await this.waitersRepository.remove(waiter);

    const data = await this.waitersRepository.find();

    return {
      message: `The waiter with the id: '${id}' was removed successfully`,
      data,
    };
  }
}
