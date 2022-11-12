import Department from 'enums/Department';
import ICourse from 'interfaces/Course';

export const defaultCourse: ICourse = {
  name: '',
  code: '',
  credit: 0,
  semester: 1,
  department: Department.CSE,
  isAutoAssign: true,
};
