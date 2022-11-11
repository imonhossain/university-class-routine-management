import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeslotController } from './timeslot.controller';
import { TimeslotService } from './timeslot.service';
import { TimeslotEntity } from './timeslot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TimeslotEntity])],
  controllers: [TimeslotController],
  providers: [TimeslotService],
})
export class TimeslotModule {}
