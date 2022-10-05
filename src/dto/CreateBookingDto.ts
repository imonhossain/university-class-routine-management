/* eslint-disable no-magic-numbers */
import Section from '@/enums/Section';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateBookingDto {
  @IsEnum(Section)
  @ApiProperty({ enum: Section })
  section: Section;

  @ApiProperty()
  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(12)
  semester: number;

  @ApiProperty()
  @IsNumber()
  @IsInt()
  @Min(1)
  registerStudent: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  courseId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  teacherId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  roomId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  timeSlotId: string;
}
