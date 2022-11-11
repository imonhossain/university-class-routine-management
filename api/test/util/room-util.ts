import { CreateRoomDto } from '@/dto/CreateRoomDto';
import { RoomEntity } from '@/modules/room/room.entity';
import { getRepository } from 'typeorm';

export async function removeRoom(id: string): Promise<void> {
  await getRepository(RoomEntity).delete(id);
}
export async function removeRooms(ids: string[]): Promise<void> {
  await getRepository(RoomEntity).delete(ids);
}

export async function createRoom(room: CreateRoomDto): Promise<RoomEntity> {
  return getRepository(RoomEntity).create(room).save();
}

export async function createRooms(rooms: CreateRoomDto[]): Promise<RoomEntity[]> {
  return getRepository(RoomEntity).save(rooms);
}
