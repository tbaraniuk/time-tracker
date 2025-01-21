import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('stats')
@ApiBearerAuth()
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('dailyStat')
  async getDailyStat() {
    return '';
  }
}
