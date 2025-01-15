import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import { CreateProjectDto } from './dto/createProject.dto';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';

@Controller('projects')
@ApiBearerAuth()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('')
  @ApiCreatedResponse({
    description: 'Returns created project data',
    type: Project,
  })
  async createProject(@Body() data: CreateProjectDto, @Request() request) {
    const userId = request.user.userId!;

    return await this.projectsService.createProject(data, userId);
  }

  @Get('')
  @ApiOkResponse({ description: 'Get user projects', type: [Project] })
  async getProjects(@Request() request): Promise<Project[]> {
    const userId = request.user.userId!;

    return await this.projectsService.getUserProjects(userId);
  }

  @Get('/:projectId')
  @ApiOkResponse({ description: 'Returns project data', type: Project })
  async getProject(
    @Param('projectId') projectId: number,
    @Request() request,
  ): Promise<Project> {
    const userId = request.user.userId!;

    return await this.projectsService.getOneUserProject(projectId, userId);
  }

  @Patch('/:projectId')
  async updateProject(
    @Param('projectId') projectId: number,
    @Body() data: CreateProjectDto,
    @Request() request,
  ) {
    const userId = request.user.userId!;

    return this.projectsService.updateProject(projectId, data, userId);
  }

  @Delete('/:projectId')
  async deleteProject(
    @Param('projectId') projectId: number,
    @Request() request,
  ) {
    const userId = request.user.userId!;

    return this.projectsService.deleteProject(projectId, userId);
  }
}
