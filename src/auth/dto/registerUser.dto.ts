import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { LoginUserDto } from './loginUser.dto';

export class RegisterUserDto extends LoginUserDto {
  @ApiProperty({
    description: 'The username of the user.',
    example: 'testuser',
  })
  @IsString({ message: 'Username must be a string' })
  username: string;
}
