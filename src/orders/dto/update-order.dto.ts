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
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ProductDto } from 'src/products/dto/product.dto';
import { ProductEntity } from 'src/products/entities/product.entity';
import { WaiterDto } from 'src/waiters/dto/waiter.dto';
import { WaiterEntity } from 'src/waiters/entities/waiter.entity';

import { ERROR_MESSAGES, Status } from '../../helpers/constants';
import { OrderDto } from './order.dto';

export class UpdateOrderQueryDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.INVALID_REQUIRED_QUERY })
  id: string;
}

export class UpdateOrderBodyDto implements OrderDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.INVALID_REQUIRED_FIELD })
  id: string;

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
