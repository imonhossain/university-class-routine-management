import { CreateRoomDto } from '@/dto/CreateRoomDto';
export function dummyUpdateRoomPayload(): CreateRoomDto {
  return {
    number: 'room3',
    capacity: 50,
    isAutoAssign: false,
  } as CreateRoomDto;
}
