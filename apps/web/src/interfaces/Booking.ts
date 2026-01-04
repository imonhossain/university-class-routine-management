import { Section } from 'enums/Section';

interface IBooking {
  id: string;
  registerStudent: number;
  semester: number;
  courseCredit?: number;
  section?: Section;
  courseId: string;
  teacherId: string;
  roomId: string;
  timeSlotId: string;
  roomNumber?: string;
  teacherName?: string;
  courseName?: string;
  isAutoAssign?: string;
  courseCode?: string;
  startTime?: string;
  endTime?: string;
}
export default IBooking;
