import { CreateCourseDto } from '@/dto/CreateCourseDto';
import { CourseEntity } from '@/modules/course/CourseEntity';
import { getRepository } from 'typeorm';

export async function removeCourse(id: string): Promise<void> {
  await getRepository(CourseEntity).delete(id);
}
export async function removeCourses(ids: string[]): Promise<void> {
  await getRepository(CourseEntity).delete(ids);
}

export async function createCourse(course: CreateCourseDto): Promise<CourseEntity> {
  return getRepository(CourseEntity).create(course).save();
}

export async function createCourses(courses: CreateCourseDto[]): Promise<CourseEntity[]> {
  return getRepository(CourseEntity).save(courses);
}
