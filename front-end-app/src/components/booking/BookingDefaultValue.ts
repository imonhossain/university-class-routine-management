import Section from 'enums/Section';
import IBooking from 'interfaces/Booking';

export const defaultBooking: IBooking = {
  id: '',
  registerStudent: 0,
  semester: 1,
  courseId: '',
  teacherId: '',
  timeSlotId: '',
  roomId: '',
  section: Section.A,
};
