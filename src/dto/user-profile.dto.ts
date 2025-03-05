import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/helpers/enums/user-role.enum';

export class UserProfileDTO {
  @ApiProperty({ example: 1, description: 'Unique user ID' })
  sub: number;

  @ApiProperty({
    example: 'admin@email.com',
    description: 'User email address',
  })
  email: string;

  @ApiProperty({ example: 'admin', enum: UserRole, description: 'User role' })
  role: UserRole;
}
