import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateTimeslotDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  endTime: string;

  @IsNumber()
  @IsInt()
  @Min(1)
  @ApiProperty()
  dayGroup: number;
}
