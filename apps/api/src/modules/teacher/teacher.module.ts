import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { TeacherEntity } from './teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherEntity])],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
