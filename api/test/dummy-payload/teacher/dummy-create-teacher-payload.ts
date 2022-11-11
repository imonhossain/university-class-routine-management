import { CreateTeacherDto } from '@/dto/CreateTeacherDto';

export function dummyCreateTeacherPayload(): CreateTeacherDto {
  return {
    name: 'techer1',
    phone: '01938484898',
    email: 'techer1@gmail.com',
  } as CreateTeacherDto;
}
