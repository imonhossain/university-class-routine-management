import { CreateCourseDto } from '@/dto/CreateCourseDto';
import { CourseEntity } from '@/modules/course/CourseEntity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
  ) {}

  async getCourses(): Promise<CourseEntity[]> {
    return this.courseRepository.find();
  }

  async createCourse(createCourseDto: CreateCourseDto): Promise<CourseEntity> {
    return this.courseRepository.create(createCourseDto).save();
  }

  async getCourse(id: string): Promise<CourseEntity> {
    return this.courseRepository.findOne({ where: { id: id } });
  }

  async updateCourse(id: string, updateCourseDto: CreateCourseDto): Promise<CourseEntity> {
    const payload = updateCourseDto as ObjectLiteral;
    await this.courseRepository.update(id, payload);
    return this.getCourse(id);
  }

  async deleteCourse(id: string): Promise<void> {
    await this.courseRepository.delete(id);
  }
}
