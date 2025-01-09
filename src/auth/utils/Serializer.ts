/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { User } from 'src/users/user.entity';
import { AUTH_SERVICE_TOKEN } from 'src/utils/constants';

import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { AuthService } from '../auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(AUTH_SERVICE_TOKEN) private readonly authService: AuthService,
  ) {
    super();
  }

  serializeUser(user: User, done: Function) {
    done(null, user);
  }

  async deserializeUser(payload: any, done: Function) {
    const user = await this.authService.findOne(payload.id);
    return user ? done(null, user) : done(null, null);
  }
}
