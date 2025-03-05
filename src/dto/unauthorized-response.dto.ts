import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedResponseDTO {
  @ApiProperty({ example: 'Invalid token', description: 'Error message' })
  message: string;

  @ApiProperty({ example: 'Unauthorized', description: 'Error type' })
  error: string;

  @ApiProperty({ example: 401, description: 'HTTP status code' })
  statusCode: number;
}
