import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/helpers/guards/jwt-auth.guard';
import { RolesGuard } from 'src/helpers/guards/roles.guard';
import { LogService } from './log.service';
import { Roles } from 'src/helpers/decorators/roles.decorator';
import { UserRole } from 'src/helpers/enums/user-role.enum';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UnauthorizedResponseDTO } from 'src/dto/unauthorized-response.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('log')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Invalid token or unauthorized access',
  type: UnauthorizedResponseDTO,
})
@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'List all logs' })
  @ApiResponse({
    status: 200,
    description: 'List of logs returned successfully',
  })
  async getLogs() {
    return this.logService.findAll();
  }
}
