import { CreateBookingDto } from '@/dto/CreateBookingDto';
import { Course } from '@/entities/Course';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, ObjectLiteral, Repository } from 'typeorm';
import { RoomEntity } from '../room/room.entity';
import { TeacherEntity } from '../teacher/teacher.entity';
import { BookingEntity } from './booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private bookingRepository: Repository<BookingEntity>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(RoomEntity)
    private roomRepository: Repository<RoomEntity>,
    @InjectRepository(TeacherEntity)
    private teacherRepository: Repository<TeacherEntity>,
  ) {}

  async getBookings(): Promise<BookingEntity[]> {
    return this.bookingRepository.find();
  }

  async createBooking(createBookingDto: CreateBookingDto): Promise<BookingEntity> {
    let hours = 0;

    const course = await this.courseRepository.findOne({ where: { id: createBookingDto.courseId } });
    // const room = await this.roomRepository.findOne({ where: { id: createBookingDto.roomId } });
    const teacher = await this.teacherRepository.findOne({ where: { id: createBookingDto.teacherId } });
    const matchRoomList = this.roomRepository.find({
      where: { capacity: MoreThanOrEqual(createBookingDto.registerStudent) },
    });
    console.log('matchRoomList', matchRoomList);

    hours = course.credit > 2 ? 2 : 1;

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

  async getAvailableSlot(): Promise<void> {
    // let slot1 = [];
    // let slot2 = [];
    // let slot3 = [];
    // this.bookingRepository.query('')
  }
}
