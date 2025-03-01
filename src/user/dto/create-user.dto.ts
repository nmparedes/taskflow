import { UserRole } from 'src/helpers/enums/user-role.enum';

export class CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}
