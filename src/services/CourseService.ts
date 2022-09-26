import { CreateCourseDto } from '@/dto/CreateCourseDto';
import { Course } from '@/entities/Course';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async getCourses(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    return this.courseRepository.create(createCourseDto).save();
  }
}
