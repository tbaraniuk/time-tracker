import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor() {}

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
