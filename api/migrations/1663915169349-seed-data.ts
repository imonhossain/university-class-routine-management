/* eslint-disable @typescript-eslint/no-empty-function */
import { User } from '@/entities/User';
import UserRoleType from '@/enums/UserRoleType';
import { getRepository, MigrationInterface } from 'typeorm';

export class SeedData1663915169349 implements MigrationInterface {
  password = 'admin';

  public async up(): Promise<void> {
    await this.insertAdminSeed();
  }

  public async down(): Promise<void> {}

  private async createUser(user: User): Promise<User> {
    return getRepository(User).create(user).save();
  }

  private async insertAdminSeed(): Promise<void> {
    await this.createUser({
      name: 'NUB Admin',
      username: 'admin',
      email: 'admin@gmail.com',
      role: UserRoleType.ADMIN,
      password: this.password,
    } as User);
  }
}
