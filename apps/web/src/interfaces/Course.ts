import { Department } from 'enums/Department';

interface ICourse {
  id: string;
  name: string;
  code: string;
  credit: number;
  department: Department;
  semester?: number;
  isAutoAssign: boolean;
}
export default ICourse;
