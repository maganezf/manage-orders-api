import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ERROR_MESSAGES, Status } from '../../helpers/constants';
import { ProductEntity } from '../../products/entities/product.entity';
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
  products: ProductEntity[];

  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.INVALID_PASSWORD })
  customerName: string;
}
