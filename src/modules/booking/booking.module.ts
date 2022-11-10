import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { BookingEntity } from './booking.entity';
import { CourseService } from '../course/CourseService';
import { CourseEntity } from '../course/CourseEntity';
import { TeacherEntity } from '../teacher/teacher.entity';
import { RoomEntity } from '../room/room.entity';
import { TeacherService } from '../teacher/teacher.service';
import { RoomService } from '../room/room.service';
import { TimeslotEntity } from '../timeslot/timeslot.entity';
import { TimeslotService } from '../timeslot/timeslot.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookingEntity, CourseEntity, TeacherEntity, RoomEntity, TimeslotEntity])],
  controllers: [BookingController],
  providers: [BookingService, CourseService, TeacherService, RoomService, TimeslotService],
})
export class BookingModule {}
