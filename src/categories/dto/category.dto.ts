import { CategoryEntity } from '../entities/category.entity';

export class CategoryDto implements CategoryEntity {
  id: string;
  name: string;
  description: string;
}
