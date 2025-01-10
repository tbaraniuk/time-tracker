import { Body, Controller, Post, Request } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/createTrack.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @ApiBearerAuth()
  async createTrack(@Body() data: CreateTrackDto, @Request() request) {
    const userId = request.user.id;

    return await this.tracksService.createTrack(data);
  }
}
