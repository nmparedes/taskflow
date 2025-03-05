import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/helpers/enums/user-role.enum';

export class UpdateUserDTO {
  @ApiProperty({ title: 'Updated user name', required: false })
  name?: string;

  @ApiProperty({ title: 'Updated user email', required: false })
  email?: string;

  @ApiProperty({ title: 'Updated user password', required: false })
  password?: string;

  @ApiProperty({ title: 'Updated user role', enum: UserRole, required: false })
  role?: UserRole;

  @ApiProperty({ title: 'Updated refresh token', required: false })
  refreshToken?: string;
}
