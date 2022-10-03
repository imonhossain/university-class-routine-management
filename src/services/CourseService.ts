import { CreateCourseDto } from '@/dto/CreateCourseDto';
import { Course } from '@/entities/Course';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';

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

  async getCourse(id: string): Promise<Course> {
    return this.courseRepository.findOne({ where: { id: id } });
  }

  async updateCourse(id: string, updateCourseDto: CreateCourseDto): Promise<Course> {
    const payload = updateCourseDto as ObjectLiteral;
    await this.courseRepository.update(id, payload);
    return this.getCourse(id);
  }

  async deleteCourse(id: string): Promise<void> {
    await this.courseRepository.delete(id);
  }
}
