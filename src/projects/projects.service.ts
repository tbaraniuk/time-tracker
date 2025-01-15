import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateProjectDto } from './dto/createProject.dto';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async createProject(data: CreateProjectDto, userId: number) {
    const newProject = this.projectRepository.create({
      name: data.name,
      description: data?.description ?? '',
      userId: userId,
    });

    return await this.projectRepository.save(newProject);
  }

  async getUserProjects(userId: number) {
    return await this.projectRepository.find({ where: { userId: userId } });
  }

  async getOneUserProject(projectId: number, userId: number) {
    return await this.projectRepository.findOne({
      where: { id: projectId, userId: userId },
      relations: ['tracks'],
    });
  }

  async updateProject(
    projectId: number,
    data: CreateProjectDto,
    userId: number,
  ) {
    return await this.projectRepository.update(
      { userId, id: projectId },
      { ...data },
    );
  }

  async deleteProject(projectId: number, userId: number) {
    return await this.projectRepository.delete({
      id: projectId,
      userId: userId,
    });
  }
}
