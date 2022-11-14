/* eslint-disable complexity */
/* eslint-disable curly */
import { TimeSlotConstant } from '@/constants/TimeSlotConstant';
import { CreateBookingDto } from '@/dto/CreateBookingDto';
import RoomIsBooked from '@/exceptions/RoomIsBooked';
import TimeSlotIsNotFree from '@/exceptions/TImeSlotIsNotFree';
import { ITimeSlot } from '@/interfaces/TimeSlot';
import { CourseEntity } from '@/modules/course/CourseEntity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { CourseService } from '../course/CourseService';
import { RoomEntity } from '../room/room.entity';
import { RoomService } from '../room/room.service';
import { TeacherService } from '../teacher/teacher.service';
import { TimeslotService } from '../timeslot/timeslot.service';
import { BookingEntity } from './booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
    private readonly courseService: CourseService,
    private readonly teacherService: TeacherService,
    private readonly roomService: RoomService,
    private readonly timeslotService: TimeslotService,
  ) {}

  async getBookings(): Promise<BookingEntity[]> {
    return this.bookingRepository.query(this.getBookingSql());
  }

  async createBooking(createBookingDto: CreateBookingDto): Promise<BookingEntity> {
    const course: CourseEntity = await this.courseService.getCourse(createBookingDto.courseId);
    const availableRooms: RoomEntity[] = !createBookingDto.roomId
      ? await this.roomService.getAvailableRooms(createBookingDto.registerStudent)
      : [await this.roomService.getRoom(createBookingDto.roomId)];
    const allBookings: BookingEntity[] = await this.getBookings();
    for (const room of availableRooms) {
      const roomSlot: ITimeSlot[] = this.freeTimeSlotForRoom(room.id, allBookings);
      const teacherSlot: ITimeSlot[] = this.freeTimeSlotForTeacher(createBookingDto.teacherId, allBookings);
      const semesterSlot: ITimeSlot[] = this.freeTimeSlotForSemester(createBookingDto.semester, allBookings);
      const commonTimeSlot = this.getCommonTimeSlot(roomSlot, teacherSlot, semesterSlot);
      const finalTimeSlotId = this.setTimeSlotId(course.credit, commonTimeSlot);
      if (finalTimeSlotId) {
        createBookingDto.timeSlotId = finalTimeSlotId;
        createBookingDto.roomId = room.id;
        const result = await this.bookingRepository.create(createBookingDto).save();
        const output = await this.getBooking(result.id);
        return output[0];
      }
    }
    const error =
      createBookingDto.roomId && availableRooms.length === 1
        ? new RoomIsBooked(availableRooms[0].number)
        : new TimeSlotIsNotFree(createBookingDto.registerStudent);
    throw error;
  }

  getCommonTimeSlot(
    roomTimeSlot: ITimeSlot[],
    teacherTimeSlot: ITimeSlot[],
    semesterTimeSlot: ITimeSlot[],
  ): ITimeSlot[] {
    const list = [...roomTimeSlot, ...teacherTimeSlot, ...semesterTimeSlot];
    const hasMap = {};
    for (const item of list) {
      if (hasMap[item.id]) {
        hasMap[item.id] += 1;
      } else {
        hasMap[item.id] = 1;
      }
    }
    const commonTimeSlot: ITimeSlot[] = [];
    for (const [key, value] of Object.entries(hasMap)) {
      if (Number(value) === 3) {
        commonTimeSlot.push(TimeSlotConstant.find((item) => item.id === key));
      }
    }
    return commonTimeSlot;
  }

  setTimeSlotId(courseCredit: number, roomSlot: ITimeSlot[]): string {
    let timeSlotId = '';
    if (courseCredit > 2) {
      for (let i = 1; i < roomSlot.length; i++) {
        if (
          roomSlot[i].dayGroup === roomSlot[i - 1].dayGroup &&
          Number(roomSlot[i].id) - Number(roomSlot[i - 1].id) === 1
        ) {
          timeSlotId = `${roomSlot[i - 1].id},${roomSlot[i].id}`;
          break;
        }
      }
    } else {
      timeSlotId = roomSlot[0].id;
    }
    return timeSlotId;
  }

  freeTimeSlotForRoom(roomId: string, allBookings: BookingEntity[]): ITimeSlot[] {
    const bookingRooms = allBookings.filter((booking) => booking.roomId === roomId);
    return this.getSlotList(bookingRooms);
  }

  freeTimeSlotForTeacher(teacherId: string, allBookings: BookingEntity[]): ITimeSlot[] {
    const bookingTeachers = allBookings.filter((booking) => booking.teacherId === teacherId);
    return this.getSlotList(bookingTeachers);
  }

  freeTimeSlotForSemester(semester: number, allBookings: BookingEntity[]): ITimeSlot[] {
    const bookingSemester = allBookings.filter((booking) => booking.semester === semester);
    return this.getSlotList(bookingSemester);
  }

  getSlotList(bookingList: BookingEntity[]): ITimeSlot[] {
    const timeSlots: ITimeSlot[] = TimeSlotConstant;
    const list = [];
    const bookingIds = [];
    for (const booking of bookingList) {
      const slotList = booking.timeSlotId.split(',');
      for (const slot of slotList) {
        bookingIds.push(slot);
      }
    }
    for (const timeSlot of timeSlots) {
      if (!bookingIds.includes(timeSlot.id)) {
        list.push(timeSlot);
      }
    }
    return list;
  }

  async getBooking(id: string): Promise<BookingEntity> {
    const sql = `${this.getBookingSql()} AND Booking.id = '${id}'`;
    try {
      return await this.bookingRepository.query(sql);
    } catch (error) {
      console.log('error', error);
    }
  }

  async updateBooking(id: string, updateBookingDto: CreateBookingDto): Promise<BookingEntity> {
    const payload = updateBookingDto as ObjectLiteral;
    await this.bookingRepository.update(id, payload);
    return this.getBooking(id);
  }

  async deleteBooking(id: string): Promise<void> {
    await this.bookingRepository.delete(id);
  }

  getBookingSql(): string {
    return `SELECT Booking.id, Booking.registerStudent, Booking.semester, Booking.timeSlotId, 
    teacherId, roomId, courseId, Course.code courseCode, Course.credit courseCredit, 
    Course.name courseName, Room.number roomNumber, 
    Teacher.name teacherName FROM Booking
    INNER JOIN Course
    ON Booking.courseId = Course.id
    INNER JOIN Room
    ON Booking.roomId = Room.id
    INNER JOIN Teacher
    on Booking.teacherId = Teacher.id`;
  }
}
