import Department from 'enums/Department';

interface ICourse {
  name: string;
  code: string;
  credit: number;
  department: Department;
  semester?: number;
  isAutoAssign?: boolean;
}
export default ICourse;
