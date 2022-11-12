import Department from 'enums/Department';
import ICourse from 'interfaces/Course';

export const defaultCourse: ICourse = {
  name: '',
  code: '',
  credit: 0,
  department: Department.CSE,
  isAutoAssign: true,
};
