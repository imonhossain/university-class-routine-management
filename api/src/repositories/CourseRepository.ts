import { CourseEntity } from '@/modules/course/CourseEntity';
import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

@Injectable()
@EntityRepository(CourseEntity)
export class CourseRepository extends Repository<CourseEntity> {}
