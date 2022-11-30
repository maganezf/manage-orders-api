import { UserEntity } from '../users/entities/user.entity';

declare global {
  import { Request } from 'express';

  interface LoginRequest extends Request {
    user: UserEntity;
  }
}
