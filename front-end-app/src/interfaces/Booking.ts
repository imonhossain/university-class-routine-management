interface IBooking {
  id: string;
  registerStudent: number;
  semester: number;
  section: number;
  courseId: string;
  teacherId: string;
  roomId: string;
  timeSlotId: string;
  roomNumber: string;
  teacherName: string;
  courseName: string;
}
export default IBooking;
