import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  @Get()
  @HealthCheck()
  check() {
    return {
      status: 'ok',
      info: { alive: { status: 'up' } },
      error: {},
      details: { alive: { status: 'up' } },
    };
  }
}
