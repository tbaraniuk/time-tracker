import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from './track.entity';
import { Repository } from 'typeorm';
import { CreateTrackDto } from './dto/createTrack.dto';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async createTrack(data: CreateTrackDto) {
    return await this.trackRepository.create({ ...data });
  }

  async getTrack(trackId: number, userId: number) {
    return await this.trackRepository.findOne({
      where: { id: trackId },
    });
  }
}
