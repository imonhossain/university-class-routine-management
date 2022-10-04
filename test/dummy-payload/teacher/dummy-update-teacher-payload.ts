import { CreateTeacherDto } from '@/dto/CreateTeacherDto';
export function dummyUpdateTeacherPayload(): CreateTeacherDto {
  return {
    name: 'techer3',
    phone: '01938484233',
    email: 'techer3@gmail.com',
  } as CreateTeacherDto;
}
