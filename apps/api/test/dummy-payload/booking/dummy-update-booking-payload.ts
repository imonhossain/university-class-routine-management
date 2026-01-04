import { CreateBookingDto } from '@/dto/CreateBookingDto';
import { Section } from '@/enums';
export function dummyUpdateBookingPayload(): CreateBookingDto {
  return {
    registerStudent: 50,
    semester: 3,
    section: Section.B,
    courseId: 'abcd',
    teacherId: 'abcd',
    roomId: 'abcd',
    timeSlotId: 'abcd',
  } as CreateBookingDto;
}
