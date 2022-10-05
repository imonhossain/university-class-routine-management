/* eslint-disable no-magic-numbers */
import { BaseEntity } from '@/common/BaseEntity';
import Section from '@/enums/Section';
import { IsInt, IsNumber, Max, Min } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'Booking' })
export class BookingEntity extends BaseEntity {
  @IsNumber()
  @Column()
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

  @Column({ type: 'varchar', length: 255 })
  courseId: string;

  @Column({ type: 'varchar', length: 255 })
  teacherId: string;

  @Column({ type: 'varchar', length: 255 })
  roomId: string;

  @Column({ type: 'varchar', length: 255 })
  timeSlotId: string;
}
