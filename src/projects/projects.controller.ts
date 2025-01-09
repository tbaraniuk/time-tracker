import { Body, Controller, Post, Request, Get } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/createProject.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('')
  async createProject(@Body() data: CreateProjectDto, @Request() request) {
    const userId = request.user.id!;

    return await this.projectsService.createProject(data, userId);
  }

  @Get('')
  async getProjects(@Request() request) {
    const userId = request.user.id!;

    return this.projectsService.getUserProjects(userId);
  }
}
