import { UserRole } from 'src/helpers/enums/user-role.enum';

export class UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  refreshToken?: string;
}
