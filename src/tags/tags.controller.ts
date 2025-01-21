import { Controller, Get } from '@nestjs/common';
import { TagsService } from './tags.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('tags')
@ApiBearerAuth()
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  async getAllTags() {
    return '';
  }
}
