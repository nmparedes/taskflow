import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/helpers/guards/jwt-auth.guard';
import { RolesGuard } from 'src/helpers/guards/roles.guarda';
import { LogService } from './log.service';
import { Roles } from 'src/helpers/decorators/roles.decorator';
import { UserRole } from 'src/helpers/enums/user-role.enum';

@Controller('logs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  async getLogs() {
    return this.logService.findAll();
  }
}
