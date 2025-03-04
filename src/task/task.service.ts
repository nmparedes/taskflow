import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from './entity/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { User } from 'src/user/entity/user.entity';
import { UserRole } from 'src/helpers/enums/user-role.enum';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { LogService } from 'src/log/log.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly logService: LogService,
  ) {}

  async findAll(user: User): Promise<Task[]> {
    if (user.role === UserRole.ADMIN) {
      return this.taskRepository.find({ relations: ['user'] });
    }
    return this.taskRepository.find({ where: { user }, relations: ['user'] });
  }

  async findOne(id: string, userId: number): Promise<Task> | null {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!task) throw new NotFoundException('Task not found');
    if (task.user.id !== userId)
      throw new ForbiddenException("You're not allowed to access this task");
    return task;
  }

  async create(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    const task = this.taskRepository.create({ ...createTaskDTO, user });
    const savedTask = await this.taskRepository.save(task);
    await this.logService.createLog(
      'CREATE',
      'Task',
      savedTask.id,
      user.id,
      createTaskDTO,
    );
    return savedTask;
  }

  async update(
    id: string,
    updateTaskDTO: UpdateTaskDTO,
    user: User,
  ): Promise<Task> {
    const task = await this.findOne(id, user.id);
    Object.assign(task, updateTaskDTO);
    const updatedTask = await this.taskRepository.save(task);
    await this.logService.createLog(
      'UPDATE',
      'Task',
      updatedTask.id,
      user.id,
      updateTaskDTO,
    );
    return updatedTask;
  }

  async delete(id: string, user: User): Promise<void> {
    const task = await this.findOne(id, user.id);
    await this.taskRepository.remove(task);
    await this.logService.createLog('DELETE', 'Task', id, user.id);
  }
}
