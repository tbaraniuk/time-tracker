import { PickType } from '@nestjs/swagger';
import { Track } from '../track.entity';

export class CreateTrackDto extends PickType(Track, [
  'total',
  'description',
  'projectId',
] as const) {}
