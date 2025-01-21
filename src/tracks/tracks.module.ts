import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from '../projects/project.entity';
import { Track } from './track.entity';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Track, Project])],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
