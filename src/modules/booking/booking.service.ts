import { TimeSlotConstant } from '@/constants/TimeSlotConstant';
import { CreateBookingDto } from '@/dto/CreateBookingDto';
import { CourseEntity } from '@/modules/course/CourseEntity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, ObjectLiteral, Repository } from 'typeorm';
import { CourseService } from '../course/CourseService';
import { RoomEntity } from '../room/room.entity';
import { RoomService } from '../room/room.service';
import { TeacherEntity } from '../teacher/teacher.entity';
import { TeacherService } from '../teacher/teacher.service';
import { BookingEntity } from './booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
    private readonly courseService: CourseService,
    private readonly teacherService: TeacherService,
    private readonly roomService: RoomService,
  ) {}

  // @InjectRepository(CourseEntity)
  //   private courseRepository: Repository<CourseEntity>,
  //   @InjectRepository(RoomEntity)
  //   private roomRepository: Repository<RoomEntity>,
  //   @InjectRepository(TeacherEntity)
  //   private teacherRepository: Repository<TeacherEntity>,

  async getBookings(): Promise<BookingEntity[]> {
    return this.bookingRepository.find();
  }

  async createBooking(createBookingDto: CreateBookingDto): Promise<BookingEntity> {
    const course: CourseEntity = await this.courseService.getCourse(createBookingDto.courseId);
    const teacher: TeacherEntity = await this.teacherService.getTeacher(createBookingDto.teacherId);
    const allRooms: RoomEntity[] = await this.roomService.getAvailableRooms(createBookingDto.registerStudent);
    const allBookings: BookingEntity[] = await this.getBookings();

    let iteration = 0;
    let found = false;

    while (allBookings.length > iteration) {
      iteration += 1;
    }
    const timeSloats = TimeSlotConstant;

    // const all = await this.courseRepository.find();
    createBookingDto.timeSlotId = '1';
    console.log('course', course);
    // let hours = 0;

    // const course = await this.courseRepository.findOne({ where: { id: createBookingDto.courseId } });
    // // const room = await this.roomRepository.findOne({ where: { id: createBookingDto.roomId } });
    // const teacher = await this.teacherRepository.findOne({ where: { id: createBookingDto.teacherId } });
    // const matchRoomList = this.roomRepository.find({
    //   where: { capacity: MoreThanOrEqual(createBookingDto.registerStudent) },
    // });
    // console.log('matchRoomList', matchRoomList);

    // hours = course.credit > 2 ? 2 : 1;

    return this.bookingRepository.create(createBookingDto).save();
    // return {} as BookingEntity;
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
