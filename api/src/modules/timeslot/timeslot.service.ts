import { CreateTimeslotDto } from '@/dto/CreateTimeslotDto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { TimeslotEntity } from './timeslot.entity';

@Injectable()
export class TimeslotService {
  constructor(
    @InjectRepository(TimeslotEntity)
    private timeslotRepository: Repository<TimeslotEntity>,
  ) {}

  async getTimeslots(): Promise<TimeslotEntity[]> {
    return this.timeslotRepository.find();
  }

  async createTimeslot(createTimeslotDto: CreateTimeslotDto): Promise<TimeslotEntity> {
    return this.timeslotRepository.create(createTimeslotDto).save();
  }

  async getTimeslot(id: string): Promise<TimeslotEntity> {
    return this.timeslotRepository.findOne({ where: { id: id } });
  }

  async updateTimeslot(id: string, updateTimeslotDto: CreateTimeslotDto): Promise<TimeslotEntity> {
    const payload = updateTimeslotDto as ObjectLiteral;
    await this.timeslotRepository.update(id, payload);
    return this.getTimeslot(id);
  }

  async deleteTimeslot(id: string): Promise<void> {
    await this.timeslotRepository.delete(id);
  }
}
