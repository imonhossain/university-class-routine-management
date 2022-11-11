/* eslint-disable complexity */
/* eslint-disable curly */
import { TimeSlotConstant } from '@/constants/TimeSlotConstant';
import { CreateBookingDto } from '@/dto/CreateBookingDto';
import { ITimeSlot } from '@/interfaces/TimeSlot';
import { CourseEntity } from '@/modules/course/CourseEntity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { CourseService } from '../course/CourseService';
import { RoomEntity } from '../room/room.entity';
import { RoomService } from '../room/room.service';
import { TeacherEntity } from '../teacher/teacher.entity';
import { TeacherService } from '../teacher/teacher.service';
import { TimeslotEntity } from '../timeslot/timeslot.entity';
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
    // const teacher: TeacherEntity = await this.teacherService.getTeacher(createBookingDto.teacherId);
    const allRooms: RoomEntity[] = await this.roomService.getAvailableRooms(createBookingDto.registerStudent);
    const allBookings: BookingEntity[] = await this.getBookings();
    let isFound = false;
    if (course.isAutoAssign) {
      for (const room of allRooms) {
        if (isFound) break;
        const roomSlot: ITimeSlot[] = this.freeTimeSlotForRoom(room.id, allBookings);
        if (roomSlot.length === 0) continue;
        const roomSlotId = this.setTimeSlotId(course.credit, roomSlot);
        if (roomSlotId) {
          createBookingDto.timeSlotId = roomSlotId;
          createBookingDto.roomId = room.id;
        } else {
          continue;
        }

        const teacherSlot: ITimeSlot[] = this.freeTimeSlotForTeacher(createBookingDto.teacherId, allBookings);
        if (teacherSlot.length === 0) continue;
        const teacherSlotId = this.setTimeSlotId(course.credit, teacherSlot);
        if (teacherSlotId) {
          // createBookingDto.timeSlotId = timeSlotId;
        } else {
          continue;
        }

        const semesterFreeSlot: ITimeSlot[] = this.freeTimeSlotForSemester(createBookingDto.semester, allBookings);
        if (semesterFreeSlot.length === 0) continue;
        const semesterFreeSlotId = this.setTimeSlotId(course.credit, semesterFreeSlot);
        if (semesterFreeSlotId) {
          // createBookingDto.timeSlotId = timeSlotId;
        } else {
          continue;
        }
        if (!roomSlotId || !teacherSlotId || !semesterFreeSlotId) {
          continue;
        } else {
          isFound = true;
          break;
        }

        // for (const timeSlot of roomSlot) {
        //   const found = allBookings.filter(
        //     (booking: BookingEntity) =>
        //       booking.timeSlotId.split(',').includes(timeSlot.id) || booking.roomId === room.id,
        //   );
        //   if (found) continue;

        //   const teacherFreeFound = allBookings.find(
        //     (booking: BookingEntity) =>
        //       booking.timeSlotId === timeSlot.id && booking.teacherId === createBookingDto.teacherId,
        //   );
        //   if (teacherFreeFound) continue;

        //   const semesterFreeFound = allBookings.find(
        //     (booking: BookingEntity) =>
        //       booking.timeSlotId === timeSlot.id && booking.semester === createBookingDto.semester,
        //   );

        //   if (!found && !teacherFreeFound && !semesterFreeFound) {
        //     if (course.credit > 2) {
        //       continue;
        //     }
        //     createBookingDto.roomId = room.id;
        //     createBookingDto.timeSlotId = timeSlot.id;
        //     isFound = true;
        //     break;
        //   }
        // }
      }
      // return this.bookingRepository.create(createBookingDto).save();
    }
    if (isFound) {
      return this.bookingRepository.create(createBookingDto).save();
    } else {
    }
    // allRooms.forEach((room: RoomEntity) => {
    //   timeSlots.forEach((timeSlot: TimeslotEntity) => {
    //     // allBookings.
    //   });
    // });

    // while (allRooms.length > iteration) {
    //   iteration += 1;
    // }
    // const timeSloats = TimeSlotConstant;

    // const all = await this.courseRepository.find();
    // createBookingDto.timeSlotId = '2a03d233-180d-48ba-b140-9620ae08e322';
    // console.log('course', course);
    // let hours = 0;

    // const course = await this.courseRepository.findOne({ where: { id: createBookingDto.courseId } });
    // // const room = await this.roomRepository.findOne({ where: { id: createBookingDto.roomId } });
    // const teacher = await this.teacherRepository.findOne({ where: { id: createBookingDto.teacherId } });
    // const matchRoomList = this.roomRepository.find({
    //   where: { capacity: MoreThanOrEqual(createBookingDto.registerStudent) },
    // });
    // console.log('matchRoomList', matchRoomList);

    // hours = course.credit > 2 ? 2 : 1;

    return {} as BookingEntity;
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
