import { IsNotEmpty, IsString } from 'class-validator';
import { ERROR_MESSAGES } from '../../helpers/constants';
import { CategoryDto } from './category.dto';

export class CreateCategoryDto implements Omit<CategoryDto, 'id'> {
  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.INVALID_REQUIRED_FIELD })
  name: string;

  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.INVALID_REQUIRED_FIELD })
  username: string;

  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.INVALID_PASSWORD })
  description: string;
}
