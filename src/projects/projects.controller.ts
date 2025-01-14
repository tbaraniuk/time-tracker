import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { CreateProjectDto } from './dto/createProject.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
@ApiBearerAuth()
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

  @Patch('')
  async updateProject() {}

  @Delete('')
  async deleteProject() {}
}
