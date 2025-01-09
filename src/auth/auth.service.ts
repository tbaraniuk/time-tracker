import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../users/user.entity';
import { UserDetailType } from 'src/utils/types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async validateGoogleUser(details: UserDetailType) {
    const user = await this.userRepository.findOne({
      where: { email: details.email },
    });

    if (user) return user;

    const newUser = await this.userRepository.create(details);

    return await this.userRepository.save(newUser);
  }

  async validateUser() {}

  async findOne(id: number) {
    return await this.userRepository.findOneBy({ id });
  }
}
