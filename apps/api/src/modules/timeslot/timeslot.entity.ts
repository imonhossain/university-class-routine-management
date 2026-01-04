/* eslint-disable no-magic-numbers */
import { BaseEntity } from '@/common/BaseEntity';
import { IsInt, IsNumber, Min } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'timeslot' })
export class TimeslotEntity extends BaseEntity {
  @Column({ name: 'startTime', type: 'varchar', length: 255 })
  startTime: string;

  @Column({ name: 'endTime', type: 'varchar', length: 255 })
  endTime: string;

  @IsNumber()
  @Column({ name: 'dayGroup' })
  @IsInt()
  @Min(1)
  dayGroup: number;
}
