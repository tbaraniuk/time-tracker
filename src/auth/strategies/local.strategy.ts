import { Strategy } from 'passport-local';
import { UsersService } from 'src/users/users.service';
import { AUTH_SERVICE_TOKEN } from 'src/utils/constants';

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTH_SERVICE_TOKEN) private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, passport: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);

    if (
      user &&
      (await this.usersService.validatePassword(passport, user.password))
    ) {
      return user;
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
