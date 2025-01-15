import { Body, Controller, Get, Param, Patch } from '@nestjs/common';

import { Public } from '../utils/public.decorator';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @Public()
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @Patch('/:userId')
  async updateUser(@Param() userId: number, @Body() userData: UpdateUserDto) {
    return await this.usersService.updateUser(userId, userData);
  }
}
