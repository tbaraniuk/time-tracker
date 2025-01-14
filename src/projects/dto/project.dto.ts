import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class ProjectDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;
}
