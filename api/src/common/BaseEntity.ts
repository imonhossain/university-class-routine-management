import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity as TypeOrmBaseEntity } from 'typeorm';
import { IsDate, IsOptional, IsUUID } from 'class-validator';

export class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
  @IsDate()
  @IsOptional()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp' })
  @IsDate()
  @IsOptional()
  updatedAt: Date;
}
