import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ERROR_MESSAGES } from '../../helpers/constants';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'username' });
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);

    if (!user)
      throw new UnauthorizedException(
        ERROR_MESSAGES.INVALID_USERNAME_OR_PASSWORD
      );

    return user;
  }
}
