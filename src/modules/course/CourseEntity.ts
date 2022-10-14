/* eslint-disable no-magic-numbers */
import { BaseEntity } from '@/common/BaseEntity';
import Department from '@/enums/Department';
import { IsInt, IsNumber, Max, Min } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'Course' })
export class CourseEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  code;

  @Column({ type: 'text' })
  name: string;

  @IsNumber()
  @Column()
  @IsInt()
  @Min(1)
  @Max(4)
  credit: number;

  @Column({
    type: 'enum',
    enum: Department,
  })
  department: Department;

  @IsNumber()
  @Column()
  @IsInt()
  @Min(1)
  @Max(12)
  semester: number;

  @Column({ type: 'boolean', default: true })
  isAutoAssign: boolean;
}
