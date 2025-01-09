import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/user.entity';
import { AUTH_SERVICE_TOKEN } from '../utils/constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SessionSerializer } from './utils/Serializer';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    {
      provide: AUTH_SERVICE_TOKEN,
      useClass: AuthService,
    },
    SessionSerializer,
    GoogleStrategy,
  ],
})
export class AuthModule {}
