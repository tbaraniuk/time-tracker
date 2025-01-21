import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateProjectDto } from './dto/createProject.dto';
import { Project } from './project.entity';
import { Tag } from '../tags/tag.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  async createProject(data: CreateProjectDto, userId: number) {
    const tagEntities = await Promise.all(
      data.tags.map(async (tagName: string) => {
        let tag = await this.tagRepository.findOne({
          where: { name: tagName },
        });
        if (!tag) {
          tag = this.tagRepository.create({ name: tagName });
          await this.tagRepository.save(tag);
        }
        return tag;
      }),
    );

    const newProject = this.projectRepository.create({
      name: data.name,
      description: data?.description ?? '',
      userId: userId,
      tags: tagEntities,
    });

    return await this.projectRepository.save(newProject);
  }

  async getUserProjects(userId: number) {
    return await this.projectRepository.find({
      where: { userId: userId },
      relations: { tracks: true },
    });
  }

  async getOneUserProject(projectId: number, userId: number) {
    return await this.projectRepository.findOne({
      where: { id: projectId, userId: userId },
      relations: {
        tracks: true,
        tags: true,
      },
    });
  }

  async updateProject(
    projectId: number,
    data: CreateProjectDto,
    userId: number,
  ) {
    const tagEntities = await Promise.all(
      data.tags.map(async (tagName: string) => {
        let tag = await this.tagRepository.findOne({
          where: { name: tagName },
        });
        if (!tag) {
          tag = this.tagRepository.create({ name: tagName });
          await this.tagRepository.save(tag);
        }
        return tag;
      }),
    );

    return await this.projectRepository.update(
      { userId, id: projectId },
      {
        name: data.name,
        description: data.description,
        tags: tagEntities,
      },
    );
  }

  async deleteProject(projectId: number, userId: number) {
    return await this.projectRepository.delete({
      id: projectId,
      userId: userId,
    });
  }
}
