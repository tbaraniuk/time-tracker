import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { GoogleLoginUserDto } from '../auth/dto/googleLoginUser.dto';
import { RegisterUserDto } from '../auth/dto/registerUser.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email: email });
  }

  async createUser(userData: RegisterUserDto) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }

  async createGoogleUser(userData: GoogleLoginUserDto) {
    const newUser = await this.userRepository.create({
      ...userData,
    });

    return await this.userRepository.save(newUser);
  }

  async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async getAllUsers() {
    return await this.userRepository.find();
  }
}
