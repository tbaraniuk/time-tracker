import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { AUTH_SERVICE_TOKEN } from '../utils/constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from './utils/Serializer';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    {
      provide: AUTH_SERVICE_TOKEN,
      useClass: AuthService,
    },
    JwtService,
    SessionSerializer,
    GoogleStrategy,
    LocalStrategy,
    JwtStrategy,
    UsersService,
    AuthService,
  ],
})
export class AuthModule {}
