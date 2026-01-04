import { CreateCourseDto } from '@/dto/CreateCourseDto';
import { Department } from '@/enums';

export function dummyUpdateCoursePayload(): CreateCourseDto {
  return {
    name: 'course1Update',
    code: 'CSE_2222',
    credit: 3,
    department: Department.EEE,
    semester: 3,
    isAutoAssign: true,
  } as CreateCourseDto;
}
