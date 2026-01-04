import { BaseEntity } from '@/common/BaseEntity';
import { saltRounds } from '@/common/Constant';
import { UserRoleType, UserStatusType } from '@/enums';
import * as bcrypt from 'bcrypt';
import { BeforeInsert, BeforeUpdate, Column, Entity, Unique } from 'typeorm';

@Entity({ name: 'user' })
@Unique(['email'])
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 320 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({
    type: 'enum',
    enum: UserRoleType,
    default: UserRoleType.ADMIN,
  })
  role: UserRoleType;

  @Column({
    type: 'enum',
    enum: UserStatusType,
    default: UserStatusType.ACTIVE,
  })
  status: UserStatusType;

  @Column({ type: 'text' })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(): void {
    if (this.password) {
      /* eslint-disable node/no-sync */
      this.password = bcrypt.hashSync(this.password, saltRounds);
    }
  }
}
