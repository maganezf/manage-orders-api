import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { WaiterDto } from '../waiters/dto/waiter.dto';
import { WaitersService } from '../waiters/waiters.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly waiterService: WaitersService,
    private readonly jwtService: JwtService
  ) {}

  async login(waiter: WaiterDto) {
    const payload = {
      sub: waiter.id,
      username: waiter.username,
    };

    return {
      message: 'Login made successfully',
      data: {
        token: this.jwtService.sign(payload),
      },
    };
  }

  async validateUser(username: string, password: string) {
    const waiter = await this.waiterService.findOneByUsername(username);

    if (!waiter) return null;

    const isPasswordValid = compareSync(password, waiter.password);
    if (!isPasswordValid) return null;

    return waiter;
  }
}
