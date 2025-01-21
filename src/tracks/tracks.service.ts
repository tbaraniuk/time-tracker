import { Repository } from 'typeorm';

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Project } from '../projects/project.entity';
import { CreateTrackDto } from './dto/createTrack.dto';
import { Track } from './track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async createTrack(data: CreateTrackDto, userId: number) {
    const currentProject = await this.projectRepository.findOne({
      where: { id: data.projectId, userId: userId },
    });

    if (!currentProject) {
      throw new ForbiddenException('This project does not belong to you!');
    }

    const newTrack = this.trackRepository.create({ ...data });

    return await this.trackRepository.save(newTrack);
  }

  async getTrack(trackId: number, userId: number) {
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
      relations: ['project', 'project.user'],
    });

    if (!track) {
      throw new NotFoundException('The track is not defined!');
    }

    if (track.project.userId !== userId) {
      throw new ForbiddenException('The track does not belong to you!');
    }

    return track;
  }

  async updateTrack(
    trackId: number,
    updatedData: CreateTrackDto,
    userId: number,
  ) {
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
      relations: ['project', 'project.user'],
    });

    if (!track) {
      throw new NotFoundException('The track is not found!');
    }

    if (track.project.userId != userId) {
      throw new ForbiddenException('You are not allowed to delete this track!');
    }

    return await this.trackRepository.update(
      { id: trackId },
      { ...updatedData },
    );
  }

  async deleteTrack(trackId: number, userId: number) {
    const track = await this.trackRepository.findOne({
      where: { id: trackId },
      relations: ['project', 'project.user'],
    });

    if (!track) {
      throw new NotFoundException('The track is not found!');
    }

    if (track.project.userId != userId) {
      throw new ForbiddenException('You are not allowed to delete this track!');
    }

    return await this.trackRepository.delete({ id: trackId });
  }
}
