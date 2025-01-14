import { Body, Controller, Post } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/createTrack.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('tracks')
@ApiBearerAuth()
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  async createTrack(@Body() data: CreateTrackDto) {
    return await this.tracksService.createTrack(data);
  }
}
