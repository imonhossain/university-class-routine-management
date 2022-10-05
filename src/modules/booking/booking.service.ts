import { CreateBookingDto } from '@/dto/CreateBookingDto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { BookingEntity } from './booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private bookingRepository: Repository<BookingEntity>,
  ) {}

  async getBookings(): Promise<BookingEntity[]> {
    return this.bookingRepository.find();
  }

  async createBooking(createBookingDto: CreateBookingDto): Promise<BookingEntity> {
    return this.bookingRepository.create(createBookingDto).save();
  }

  async getBooking(id: string): Promise<BookingEntity> {
    return this.bookingRepository.findOne({ where: { id: id } });
  }

  async updateBooking(id: string, updateBookingDto: CreateBookingDto): Promise<BookingEntity> {
    const payload = updateBookingDto as ObjectLiteral;
    await this.bookingRepository.update(id, payload);
    return this.getBooking(id);
  }

  async deleteBooking(id: string): Promise<void> {
    await this.bookingRepository.delete(id);
  }
}
