import { IsArray, IsString } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Project } from '../project.entity';

export class CreateProjectDto extends PickType(Project, [
  'description',
  'name',
] as const) {
  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
