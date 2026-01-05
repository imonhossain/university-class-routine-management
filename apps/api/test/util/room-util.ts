import { CreateRoomDto } from '@/dto/CreateRoomDto';
import { RoomEntity } from '@/modules/room/room.entity';
import { getDataSource } from './app-util';

export async function removeRoom(id: string): Promise<void> {
  await getDataSource().getRepository(RoomEntity).delete(id);
}
export async function removeRooms(ids: string[]): Promise<void> {
  await getDataSource().getRepository(RoomEntity).delete(ids);
}

export async function createRoom(room: CreateRoomDto): Promise<RoomEntity> {
  const repo = getDataSource().getRepository(RoomEntity);
  return repo.save(repo.create(room));
}

export async function createRooms(rooms: CreateRoomDto[]): Promise<RoomEntity[]> {
  return getDataSource().getRepository(RoomEntity).save(rooms);
}
