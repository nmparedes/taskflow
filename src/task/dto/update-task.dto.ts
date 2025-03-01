import { TaskStatus } from 'src/helpers/enums/task-status.enum';

export class UpdateTaskDTO {
  title?: string;
  description?: string;
  status?: TaskStatus;
  dueDate?: Date;
}
