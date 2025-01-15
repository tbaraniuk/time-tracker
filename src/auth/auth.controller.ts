import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';

import { Public } from '../utils/public.decorator';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { RegisterUserDto } from './dto/registerUser.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AccessTokenDto } from './dto/accessToken.dto';
import { RegisterUserResponseDto } from './dto/registerUserResponse.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  @ApiCreatedResponse({
    description: 'Returns created user data and jwt access token',
    type: RegisterUserResponseDto,
  })
  async register(@Body() data: RegisterUserDto) {
    return await this.authService.registerUser(data);
  }

  @Post('login')
  @Public()
  @ApiBody({ description: 'Login user data', type: LoginUserDto })
  @ApiCreatedResponse({
    description: 'Get jwt access token',
    type: AccessTokenDto,
  })
  @UseGuards(AuthGuard('local'))
  async login(@Req() request) {
    return this.authService.login(request.user);
  }

  @Get('google/login')
  @Public()
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {
    return '';
  }

  @Get('google/redirect')
  @Public()
  @UseGuards(GoogleAuthGuard)
  async googleRedirect(@Req() request) {
    return request.user;
  }

  @Get('get-status')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getStatus(@Req() request) {
    if (request.user) {
      return { msg: 'Authenticated' };
    }

    return { msg: 'Not Authenticated' };
  }
}
