import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './entity/task.entity';
import { JwtAuthGuard } from 'src/helpers/guards/jwt-auth.guard';
import { CreateTaskDTO } from '../dto/create-task.dto';
import { UpdateTaskDTO } from '../dto/update-task.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UnauthorizedResponseDTO } from 'src/dto/unauthorized-response.dto';

@UseGuards(JwtAuthGuard)
@ApiTags('task')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Invalid token or unauthorized access',
  type: UnauthorizedResponseDTO,
})
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiOperation({ summary: 'List all tasks' })
  @ApiResponse({
    status: 200,
    description: 'List of tasks returned successfully',
  })
  findAll(@Req() req): Promise<Task[]> {
    return this.taskService.findAll(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID', type: Number })
  @ApiResponse({ status: 200, description: 'Task found successfully' })
  findOne(@Param() id: string, @Req() req) {
    return this.taskService.findOne(id, req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  createTask(@Body() createTaskDTO: CreateTaskDTO, @Req() req) {
    return this.taskService.create(createTaskDTO, req.user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing task' })
  @ApiParam({ name: 'id', description: 'Task ID to update', type: Number })
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  update(
    @Param('id') id: string,
    @Body() updateTaskDTO: UpdateTaskDTO,
    @Req() req,
  ) {
    return this.taskService.update(id, updateTaskDTO, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'id', description: 'Task ID to delete', type: Number })
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  deleteTask(@Param('id') id: string, @Req() req) {
    return this.taskService.delete(id, req.user);
  }
}
