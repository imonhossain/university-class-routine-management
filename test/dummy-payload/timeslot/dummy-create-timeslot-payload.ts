import { CreateTimeslotDto } from '@/dto/CreateTimeslotDto';

export function dummyCreateTimeslotPayload(): CreateTimeslotDto {
  return {
    startTime: '08:45:00',
    endTime: '09:45:00',
    dayGroup: 1,
  } as CreateTimeslotDto;
}
