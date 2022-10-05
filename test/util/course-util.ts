import { CreateCourseDto } from '@/dto/CreateCourseDto';
import { Course } from '@/entities/Course';
import { getRepository } from 'typeorm';

export async function removeCourse(id: string): Promise<void> {
  await getRepository(Course).delete(id);
}
export async function removeCourses(ids: string[]): Promise<void> {
  await getRepository(Course).delete(ids);
}

export async function createCourse(course: CreateCourseDto): Promise<Course> {
  return getRepository(Course).create(course).save();
}

export async function createCourses(courses: CreateCourseDto[]): Promise<Course[]> {
  return getRepository(Course).save(courses);
}
