import { ApiProperty } from '@nestjs/swagger';

import { AccessTokenDto } from './accessToken.dto';
import { User } from 'src/users/user.entity';

export class RegisterUserResponseDto {
  @ApiProperty()
  data: User;

  @ApiProperty()
  access_token: AccessTokenDto;
}
