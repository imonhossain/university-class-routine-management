import Section from 'enums/Section';

interface IBooking {
  id: string;
  registerStudent: number;
  semester: number;
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
}
export default IBooking;
