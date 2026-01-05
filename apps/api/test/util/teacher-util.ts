import { CreateTeacherDto } from '@/dto/CreateTeacherDto';
import { TeacherEntity } from '@/modules/teacher/teacher.entity';
import { getDataSource } from './app-util';

export async function removeTeacher(id: string): Promise<void> {
  await getDataSource().getRepository(TeacherEntity).delete(id);
}
export async function removeTeachers(ids: string[]): Promise<void> {
  await getDataSource().getRepository(TeacherEntity).delete(ids);
}

export async function createTeacher(teacher: CreateTeacherDto): Promise<TeacherEntity> {
  const repo = getDataSource().getRepository(TeacherEntity);
  return repo.save(repo.create(teacher));
}

export async function createTeachers(teachers: CreateTeacherDto[]): Promise<TeacherEntity[]> {
  return getDataSource().getRepository(TeacherEntity).save(teachers);
}
