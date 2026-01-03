/* eslint-disable no-magic-numbers */
import { BaseEntity } from '@/common/BaseEntity';
import { IsInt, IsNumber, Min } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'room' })
export class RoomEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  number: string;

  @IsNumber()
  @Column()
  @IsInt()
  @Min(1)
  capacity: number;

  @Column({ name: 'isAutoAssign', type: 'boolean', default: true })
  isAutoAssign: boolean;
}
