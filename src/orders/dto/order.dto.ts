import { Status } from '../../helpers/constants';
import { ProductDto } from '../../products/dto/product.dto';
import { OrderEntity } from '../entities/order.entity';

export class OrderDto implements Omit<OrderEntity, 'products'> {
  id: string;
  table: number;
  status: Status;
  createdAt: string;
  products: ProductDto[];
  customerName: string;
}
