import { Status } from 'src/helpers/constants';
import { ProductDto } from 'src/products/dto/product.dto';
import { WaiterDto } from 'src/waiters/dto/waiter.dto';
import { OrderEntity } from '../entities/order.entity';

export class OrderDto implements Omit<OrderEntity, 'products' | 'waiter'> {
  id: string;
  table: number;
  status: Status;
  createdAt: string;
  products: ProductDto[];
  waiter: WaiterDto;
  customerName: string;
}
