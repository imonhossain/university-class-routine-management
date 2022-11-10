import { CreateTimeslotDto } from '@/dto/CreateTimeslotDto';

export function dummyUpdateTimeslotPayload(): CreateTimeslotDto {
  return {
    startTime: '08:45:00',
    endTime: '09:45:00',
    dayGroup: 1,
  } as CreateTimeslotDto;
}
