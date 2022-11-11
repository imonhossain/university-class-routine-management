/* eslint-disable no-magic-numbers */
import { BaseEntity } from '@/common/BaseEntity';
import { IsInt, IsNumber, Min } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'Timeslot' })
export class TimeslotEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  startTime;

  @Column({ type: 'varchar', length: 255 })
  endTime;

  @IsNumber()
  @Column()
  @IsInt()
  @Min(1)
  dayGroup: number;
}
