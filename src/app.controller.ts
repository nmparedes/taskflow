import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('healthcheck')
@Controller()
export class AppController {
  @ApiOperation({ summary: 'Check if the API is running' })
  @ApiResponse({
    status: 200,
    description: 'API is running and returning the current timestamp',
    schema: {
      example: { timestamp: '2025-03-05T12:34:56.789Z' },
    },
  })
  @Get()
  healthcheck() {
    return { timestamp: new Date() };
  }
}
