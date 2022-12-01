import { CategoryDto } from 'src/categories/dto/category.dto';
import { ProductEntity } from '../entities/product.entity';

export class ProductDto implements Omit<ProductEntity, 'order'> {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: CategoryDto;
}
