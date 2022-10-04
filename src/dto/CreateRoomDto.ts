import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  number: string;

  @IsNumber()
  @IsInt()
  @Min(1)
  @ApiProperty()
  capacity: number;

  @ApiProperty()
  @IsBoolean()
  isAutoAssign: boolean;
}
