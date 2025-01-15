import { PickType } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';

export class RegisterUserDto extends PickType(User, [
  'email',
  'password',
  'username',
] as const) {}
