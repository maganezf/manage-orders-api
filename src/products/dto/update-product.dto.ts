import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';

import { ERROR_MESSAGES } from '../../helpers/constants';
import { ProductDto } from './product.dto';

class CategoryDto extends CreateCategoryDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.INVALID_REQUIRED_FIELD })
  id: string;
}

export class UpdateProductQueryDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.INVALID_REQUIRED_QUERY })
  id: string;
}

export class UpdateProductBodyDto implements ProductDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.INVALID_REQUIRED_FIELD })
  id: string;

  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.INVALID_REQUIRED_FIELD })
  name: string;

  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.INVALID_REQUIRED_FIELD })
  description: string;

  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.INVALID_REQUIRED_FIELD })
  image: string;

  @IsNumber()
  @IsNotEmpty({ message: ERROR_MESSAGES.INVALID_REQUIRED_FIELD })
  price: number;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CategoryDto)
  category: CategoryDto;
}
