import { WaiterEntity } from '../entities/waiter.entity';

export class WaiterDto implements Omit<WaiterEntity, 'hashPassword'> {
  id: string;
  name: string;
  username: string;
  password: string;
}
