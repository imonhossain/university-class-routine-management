import { CreateBookingDto } from '@/dto/CreateBookingDto';
import { BookingEntity } from '@/modules/booking/booking.entity';
import { getRepository } from 'typeorm';

export async function removeBooking(id: string): Promise<void> {
  await getRepository(BookingEntity).delete(id);
}
export async function removeBookings(ids: string[]): Promise<void> {
  await getRepository(BookingEntity).delete(ids);
}

export async function createBooking(booking: CreateBookingDto): Promise<BookingEntity> {
  return getRepository(BookingEntity).create(booking).save();
}
