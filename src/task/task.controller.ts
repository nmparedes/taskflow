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
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Controller('task')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll(@Req() req): Promise<Task[]> {
    return this.taskService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param() id: string, @Req() req) {
    return this.taskService.findOne(id, req.user.id);
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO, @Req() req) {
    return this.taskService.create(createTaskDTO, req.user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDTO: UpdateTaskDTO,
    @Req() req,
  ) {
    return this.taskService.update(id, updateTaskDTO, req.user);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string, @Req() req) {
    return this.taskService.delete(id, req.user);
  }
}
