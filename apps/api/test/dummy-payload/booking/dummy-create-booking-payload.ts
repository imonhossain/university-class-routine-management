import { CreateBookingDto } from '@/dto/CreateBookingDto';
import { Section } from '@/enums';

export function dummyCreateBookingPayload(): CreateBookingDto {
  return {
    registerStudent: 40,
    semester: 4,
    section: Section.A,
    courseId: '1591b0a7-426f-438e-ba07-950084257cb5',
    teacherId: '06094548-82ca-4f17-a03e-11436faa4f9d',
    roomId: '04f6601e-d19a-4522-a839-b25468b27ecd',
    timeSlotId: 'abc',
  } as CreateBookingDto;
}
