/* eslint-disable no-magic-numbers */
import { BaseEntity } from '@/common/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'teacher' })
export class TeacherEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;
}
