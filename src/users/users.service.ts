import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './user.entity';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { GoogleLoginUserDto } from 'src/auth/dto/googleLoginUser.dto';

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
