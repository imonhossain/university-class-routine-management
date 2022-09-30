/* eslint-disable no-magic-numbers */
import Department from '@/enums/Department';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Max(50)
  code: string;

  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(4)
  credit: number;

  @IsEnum(Department)
  @ApiProperty({ enum: Department })
  department: Department;

  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(12)
  semester: number;

  @IsBoolean()
  isAutoAssign: boolean;
}
