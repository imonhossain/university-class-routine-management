import { CreateBookingDto } from '@/dto/CreateBookingDto';
import { BookingEntity } from '@/modules/booking/booking.entity';
import { getDataSource } from './app-util';

export async function removeBooking(id: string): Promise<void> {
  await getDataSource().getRepository(BookingEntity).delete(id);
}
export async function removeBookings(ids: string[]): Promise<void> {
  await getDataSource().getRepository(BookingEntity).delete(ids);
}

export async function createBooking(booking: CreateBookingDto): Promise<BookingEntity> {
  const repo = getDataSource().getRepository(BookingEntity);
  return repo.save(repo.create(booking));
}
