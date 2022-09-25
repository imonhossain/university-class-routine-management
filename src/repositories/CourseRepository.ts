import { Course } from '@/entities/Course';
import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

@Injectable()
@EntityRepository(Course)
export class CourseRepository extends Repository<Course> {}
