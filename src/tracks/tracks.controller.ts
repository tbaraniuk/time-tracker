import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

import { CreateTrackDto } from './dto/createTrack.dto';
import { TracksService } from './tracks.service';
import { Track } from './track.entity';

@Controller('tracks')
@ApiBearerAuth()
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  async createTrack(@Body() data: CreateTrackDto, @Request() request) {
    const userId = request.user.userId!;

    return await this.tracksService.createTrack(data, userId);
  }

  @Get('/:trackId')
  @ApiOkResponse({ description: 'Get a track data', type: Track })
  async getTrack(
    @Param('trackId') trackId: number,
    @Request() request,
  ): Promise<Track> {
    const userId = request.user.userId!;

    return await this.tracksService.getTrack(trackId, userId);
  }

  @Patch('/:trackId')
  async getUpdateTrack(
    @Param('trackId') trackId: number,
    @Body() updatedData: CreateTrackDto,
    @Request() request,
  ) {
    const userId = request.user.userId!;

    return await this.tracksService.updateTrack(trackId, updatedData, userId);
  }

  @Delete('/:trackId')
  async deleteTrack(@Param('trackId') trackId: number, @Request() request) {
    const userId = request.user.userId!;

    return await this.tracksService.deleteTrack(trackId, userId);
  }
}
