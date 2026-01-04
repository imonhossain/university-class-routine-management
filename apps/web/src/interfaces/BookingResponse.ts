import { Section } from 'enums/Section';

interface IBookingResponse {
  id: string;
  registerStudent: number;
  semester: number;
  courseCredit: number;
  section: Section;
  courseId: string;
  teacherId: string;
  roomId: string;
  timeSlotId: string;
  roomNumber: string;
  teacherName: string;
  courseName: string;
  isAutoAssign: string;
  courseCode: string;
}
export default IBookingResponse;
