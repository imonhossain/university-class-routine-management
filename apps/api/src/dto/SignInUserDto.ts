import { UserRoleType, UserStatusType } from '@/enums';

export class SignInUserDto {
  id: string;

  name: string;

  username: string;

  email: string;

  role: UserRoleType;

  status: UserStatusType;

  token: string;

  createdAt: Date;

  updatedAt: Date;
}
