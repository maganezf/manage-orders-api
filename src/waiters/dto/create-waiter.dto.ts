import { IsNotEmpty, IsString } from 'class-validator';
import { ERROR_MESSAGES } from '../../helpers/constants';
import { WaiterDto } from './waiter.dto';

export class CreateWaiterDto implements Omit<WaiterDto, 'id'> {
  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.INVALID_REQUIRED_FIELD })
  username: string;

  @IsString()
  @IsNotEmpty({ message: ERROR_MESSAGES.INVALID_PASSWORD })
  password: string;
}
