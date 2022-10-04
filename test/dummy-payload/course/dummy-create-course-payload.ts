import { CreateCourseDto } from '@/dto/CreateCourseDto';
import Department from '@/enums/Department';

export function dummyCreateCoursePayload(): CreateCourseDto {
  return {
    name: 'course1',
    code: 'CSE_4533',
    credit: 4,
    department: Department.CSE,
    semester: 1,
    isAutoAssign: false,
  } as CreateCourseDto;
}
