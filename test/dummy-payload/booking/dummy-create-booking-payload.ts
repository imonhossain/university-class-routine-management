import { CreateBookingDto } from '@/dto/CreateBookingDto';
import Section from '@/enums/Section';

export function dummyCreateBookingPayload(): CreateBookingDto {
  return {
    registerStudent: 40,
    semester: 4,
    section: Section.A,
    courseId: 'abc',
    teacherId: 'abc',
    roomId: 'abc',
    timeSlotId: 'abc',
  } as CreateBookingDto;
}
