import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/createProject.dto';

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
}
