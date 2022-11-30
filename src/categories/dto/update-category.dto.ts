import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { ERROR_MESSAGES } from '../../helpers/constants';
import { CategoryDto } from './category.dto';

export class UpdateCategoryQueryDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.INVALID_REQUIRED_QUERY })
  id: string;
}

export class UpdateCategoryBodyDto implements CategoryDto {
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
}
