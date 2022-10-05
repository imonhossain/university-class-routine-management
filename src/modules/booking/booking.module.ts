import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { BookingEntity } from './booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookingEntity])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
