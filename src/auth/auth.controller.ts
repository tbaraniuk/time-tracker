import { Controller, Get, Req, UseGuards, Post, Body } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { RegisterUserDto } from './dto/registerUser.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: RegisterUserDto) {
    return await this.authService.registerUser(data);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Body() data: LoginUserDto, @Req() request) {
    return this.authService.login(request.user);
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {
    return '';
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleRedirect(@Req() request) {
    return request.user;
  }

  @Get('get-status')
  async getStatus(@Req() request) {
    if (request.user) {
      return { msg: 'Authenticated' };
    }

    return { msg: 'Not Authenticated' };
  }
}
