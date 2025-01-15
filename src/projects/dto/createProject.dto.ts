import { PickType } from '@nestjs/swagger';
import { Project } from '../project.entity';

export class CreateProjectDto extends PickType(Project, [
  'description',
  'name',
] as const) {}
