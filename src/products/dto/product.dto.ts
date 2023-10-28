import { CategoryDto } from '../../categories/dto/category.dto';
import { ProductEntity } from '../entities/product.entity';

export class ProductDto implements Omit<ProductEntity, 'order'> {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryDto;
}
