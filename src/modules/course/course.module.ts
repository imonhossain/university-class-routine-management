import { Course } from '@/entities/Course';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from './CourseController';
import { CourseService } from './CourseService';

/* eslint-disable node/no-process-env */
@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
