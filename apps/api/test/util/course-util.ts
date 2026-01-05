import { CreateCourseDto } from '@/dto/CreateCourseDto';
import { CourseEntity } from '@/modules/course/CourseEntity';
import { getDataSource } from './app-util';

export async function removeCourse(id: string): Promise<void> {
  await getDataSource().getRepository(CourseEntity).delete(id);
}
export async function removeCourses(ids: string[]): Promise<void> {
  await getDataSource().getRepository(CourseEntity).delete(ids);
}

export async function createCourse(course: CreateCourseDto): Promise<CourseEntity> {
  const repo = getDataSource().getRepository(CourseEntity);
  return repo.save(repo.create(course));
}

export async function createCourses(courses: CreateCourseDto[]): Promise<CourseEntity[]> {
  return getDataSource().getRepository(CourseEntity).save(courses);
}
