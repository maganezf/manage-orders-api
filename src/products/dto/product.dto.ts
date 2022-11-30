import { CategoryDto } from 'src/categories/dto/category.dto';
import { OrderDto } from 'src/orders/dto/order.dto';
import { ProductEntity } from '../entities/product.entity';

export class ProductDto implements Omit<ProductEntity, 'orders'> {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  orders: OrderDto[];
  category: CategoryDto;
}
