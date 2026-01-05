import { CreateTimeslotDto } from '@/dto/CreateTimeslotDto';
import { TimeslotEntity } from '@/modules/timeslot/timeslot.entity';
import { getDataSource } from './app-util';

export async function removeTimeslot(id: string): Promise<void> {
  await getDataSource().getRepository(TimeslotEntity).delete(id);
}
export async function removeTimeslots(ids: string[]): Promise<void> {
  await getDataSource().getRepository(TimeslotEntity).delete(ids);
}

export async function createTimeslot(timeslot: CreateTimeslotDto): Promise<TimeslotEntity> {
  const repo = getDataSource().getRepository(TimeslotEntity);
  return repo.save(repo.create(timeslot));
}

export async function createTimeslots(timeslots: CreateTimeslotDto[]): Promise<TimeslotEntity[]> {
  return getDataSource().getRepository(TimeslotEntity).save(timeslots);
}
