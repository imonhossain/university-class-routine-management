import { CreateRoomDto } from '@/dto/CreateRoomDto';

export function dummyCreateRoomPayload(): CreateRoomDto {
  return {
    number: 'room1',
    capacity: 30,
    isAutoAssign: true,
  } as CreateRoomDto;
}
