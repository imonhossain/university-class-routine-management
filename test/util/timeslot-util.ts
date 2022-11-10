import { CreateTimeslotDto } from '@/dto/CreateTimeslotDto';
import { TimeslotEntity } from '@/modules/timeslot/timeslot.entity';
import { getRepository } from 'typeorm';

export async function removeTimeslot(id: string): Promise<void> {
  await getRepository(TimeslotEntity).delete(id);
}
export async function removeTimeslots(ids: string[]): Promise<void> {
  await getRepository(TimeslotEntity).delete(ids);
}

export async function createTimeslot(timeslot: CreateTimeslotDto): Promise<TimeslotEntity> {
  return getRepository(TimeslotEntity).create(timeslot).save();
}

export async function createTimeslots(timeslots: CreateTimeslotDto[]): Promise<TimeslotEntity[]> {
  return getRepository(TimeslotEntity).save(timeslots);
}
