/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();
import { CourseEntity } from '@/modules/course/CourseEntity';
import { User } from '@/entities/User';
import { BookingEntity } from '@/modules/booking/booking.entity';
import { RoomEntity } from '@/modules/room/room.entity';
import { TeacherEntity } from '@/modules/teacher/teacher.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TimeslotEntity } from '@/modules/timeslot/timeslot.entity';

const TypeOrmConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [User, CourseEntity, RoomEntity, TeacherEntity, BookingEntity, TimeslotEntity],
  logging: true,
  synchronize: false,
  migrations: process.env.typeorm === 'true' ? ['migrations/*.ts'] : [],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  charset: 'utf8mb4',
};

export default TypeOrmConfig;

export const AppDataSource = new DataSource(TypeOrmConfig);
