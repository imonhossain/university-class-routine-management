import { CreateTeacherDto } from '@/dto/CreateTeacherDto';
import { TeacherEntity } from '@/modules/teacher/teacher.entity';
import { getRepository } from 'typeorm';

export async function removeTeacher(id: string): Promise<void> {
  await getRepository(TeacherEntity).delete(id);
}
export async function removeTeachers(ids: string[]): Promise<void> {
  await getRepository(TeacherEntity).delete(ids);
}

export async function createTeacher(teacher: CreateTeacherDto): Promise<TeacherEntity> {
  return getRepository(TeacherEntity).create(teacher).save();
}

export async function createTeachers(teachers: CreateTeacherDto[]): Promise<TeacherEntity[]> {
  return getRepository(TeacherEntity).save(teachers);
}
