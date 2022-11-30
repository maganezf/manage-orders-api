import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { ERROR_MESSAGES } from '../../helpers/constants';
import { WaiterDto } from './waiter.dto';

export class UpdateWaiterQueryDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.INVALID_REQUIRED_QUERY })
  id: string;
}

export class UpdateWaiterBodyDto implements WaiterDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.INVALID_REQUIRED_FIELD })
  id: string;

  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.INVALID_REQUIRED_FIELD })
  name: string;

  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.INVALID_REQUIRED_FIELD })
  username: string;

  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.INVALID_REQUIRED_FIELD })
  password: string;
}
