/* eslint-disable no-magic-numbers */
import { BaseEntity } from '@/common/BaseEntity';
import Section from '@/enums/Section';
import { IsInt, IsNumber, Max, Min } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'booking' })
export class BookingEntity extends BaseEntity {
  @IsNumber()
  @Column({ name: 'registerStudent' })
  @IsInt()
  @Min(1)
  registerStudent: number;

  @IsNumber()
  @Column()
  @IsInt()
  @Min(1)
  @Max(12)
  semester: number;

  @Column({
    type: 'enum',
    enum: Section,
  })
  section: Section;

  @Column({ name: 'courseId', type: 'uuid' })
  courseId: string;

  @Column({ name: 'teacherId', type: 'uuid' })
  teacherId: string;

  @Column({ name: 'roomId', type: 'uuid' })
  roomId: string;

  @Column({ name: 'timeSlotId', type: 'varchar', length: 255 })
  timeSlotId: string;
}
