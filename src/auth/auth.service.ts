import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { GoogleLoginUserDto } from './dto/googleLoginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(data: RegisterUserDto) {
    return await this.usersService.createUser(data);
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async validateGoogleUser(details: GoogleLoginUserDto) {
    const user = await this.usersService.findUserByEmail(details.email);

    if (user) return user;

    const newUser = await this.usersService.createGoogleUser(details);

    return await this.userRepository.save(newUser);
  }

  async validateUser() {}

  async findOne(id: number) {
    return await this.userRepository.findOneBy({ id });
  }
}
