import Department from '@/enums/Department';

export class CreateCourseDto {
  id: string;

  name: string;

  code: string;

  credit: number;

  department: Department;

  semester: number;

  isAutoAssign: string;
}
