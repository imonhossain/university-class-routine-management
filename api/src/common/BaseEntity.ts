import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity as TypeOrmBaseEntity } from 'typeorm';
import { IsDate, IsOptional, IsUUID } from 'class-validator';

export class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @CreateDateColumn({ type: 'datetime' })
  @IsDate()
  @IsOptional()
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  @IsDate()
  @IsOptional()
  updatedAt: Date;
}
