// import { Strategy } from 'passport-local';
// import { AUTH_SERVICE_TOKEN } from 'src/utils/constants';

// import { Inject, Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';

// import { AuthService } from '../auth.service';

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     @Inject(AUTH_SERVICE_TOKEN) private readonly authService: AuthService,
//   ) {
//     super({ usernameField: 'email' });
//   }

//   async validate(email: string, passport: string): Promise<any> {}
// }
