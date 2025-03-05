import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/helpers/enums/user-role.enum';

export class CreateUserDTO {
  @ApiProperty({ title: 'User name' })
  name: string;

  @ApiProperty({ title: 'User email' })
  email: string;

  @ApiProperty({ title: 'User password' })
  password: string;

  @ApiProperty({
    title: 'User role',
    default: UserRole.USER,
    enum: UserRole,
    required: false,
  })
  role?: UserRole;
}
