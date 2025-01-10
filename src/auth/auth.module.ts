import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { AUTH_SERVICE_TOKEN } from '../utils/constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from './utils/Serializer';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
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
    JwtAuthGuard,
  ],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
