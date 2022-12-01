import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProductDto } from 'src/products/dto/product.dto';
import { WaiterDto } from 'src/waiters/dto/waiter.dto';
import { ERROR_MESSAGES, Status } from '../../helpers/constants';
import { ProductEntity } from '../../products/entities/product.entity';
import { WaiterEntity } from '../../waiters/entities/waiter.entity';
import { OrderDto } from './order.dto';

export class CreateOrderDto implements Omit<OrderDto, 'id'> {
  @IsNumber()
  @IsNotEmpty({ message: ERROR_MESSAGES.INVALID_REQUIRED_FIELD })
  table: number;

  @IsString()
  @IsEnum(Status)
  @IsNotEmpty({ message: ERROR_MESSAGES.INVALID_REQUIRED_FIELD })
  status: Status;

  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.INVALID_PASSWORD })
  createdAt: string;

  @IsArray()
  @IsNotEmpty({ message: ERROR_MESSAGES.INVALID_REQUIRED_FIELD })
  @ValidateNested({ each: true })
  @Type(() => ProductEntity)
  products: ProductDto[];

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => WaiterEntity)
  waiter: WaiterDto;

  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.INVALID_PASSWORD })
  customerName: string;
}
