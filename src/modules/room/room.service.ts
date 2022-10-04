import { CreateRoomDto } from '@/dto/CreateRoomDto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { RoomEntity } from './room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private roomRepository: Repository<RoomEntity>,
  ) {}

  async getRooms(): Promise<RoomEntity[]> {
    return this.roomRepository.find();
  }

  async createRoom(createRoomDto: CreateRoomDto): Promise<RoomEntity> {
    return this.roomRepository.create(createRoomDto).save();
  }

  async getRoom(id: string): Promise<RoomEntity> {
    return this.roomRepository.findOne({ where: { id: id } });
  }

  async updateRoom(id: string, updateRoomDto: CreateRoomDto): Promise<RoomEntity> {
    const payload = updateRoomDto as ObjectLiteral;
    await this.roomRepository.update(id, payload);
    return this.getRoom(id);
  }

  async deleteRoom(id: string): Promise<void> {
    await this.roomRepository.delete(id);
  }
}
