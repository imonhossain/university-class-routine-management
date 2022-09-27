import { Course } from '@/entities/Course';
import { getRepository } from 'typeorm';

export async function removeCourse(id: string): Promise<void> {
  await getRepository(Course).delete(id);
}
export async function removeCourses(ids: string[]): Promise<void> {
  await getRepository(Course).delete(ids);
}
