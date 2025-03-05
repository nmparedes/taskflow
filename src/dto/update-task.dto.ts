import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from 'src/helpers/enums/task-status.enum';

export class UpdateTaskDTO {
  @ApiProperty({ title: 'Updated title', required: false })
  title?: string;

  @ApiProperty({ title: 'Updated description', required: false })
  description?: string;

  @ApiProperty({ title: 'Updated status', enum: TaskStatus, required: false })
  status?: TaskStatus;

  @ApiProperty({
    title: 'Updated due date',
    example: '2025-01-01T23:59:59.000Z',
    required: false,
  })
  dueDate?: Date;
}
