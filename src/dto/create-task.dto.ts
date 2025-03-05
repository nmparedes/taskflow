import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDTO {
  @ApiProperty({
    description: "The task's title",
  })
  title: string;

  @ApiProperty({ description: 'Task description' })
  description: string;

  @ApiProperty({
    description: 'Due date',
    example: '2025-01-01T23:59:59.000Z',
    required: false,
  })
  dueDate?: Date;
}
