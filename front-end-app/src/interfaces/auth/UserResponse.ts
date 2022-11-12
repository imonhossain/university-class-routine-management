import UserRoleType from 'enums/UserRoleType';
import UserStatusType from 'enums/UserStatusType';

interface UserResponse {
  name: string;

  username: string;

  email: string;

  role: UserRoleType;

  status: UserStatusType;

  token: string;

  createdAt: Date;

  updatedAt: Date;
}
export default UserResponse;
