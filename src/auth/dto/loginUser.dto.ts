import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'The email address of the user.',
    example: 'test@example.com',
  })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @ApiProperty({
    description: 'The password of the user.',
    example: 'password123',
  })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at lease 6 characters long' })
  password: string;
}
