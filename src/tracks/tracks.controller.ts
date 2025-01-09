import { Body, Controller, Post, Request } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/createTrack.dto';

@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  async createTrack(@Body() data: CreateTrackDto, @Request() request) {
    const userId = request.user.id;

    return await this.tracksService.createTrack(data);
  }
}
