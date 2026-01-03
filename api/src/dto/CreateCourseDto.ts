/* eslint-disable no-magic-numbers */
import Department from '@/enums/Department';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  code: string;

  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(4)
  @Type(() => Number)
  @ApiProperty()
  credit: number;

  @IsEnum(Department)
  @ApiProperty({ enum: Department })
  department: Department;

  @ApiProperty()
  @IsNumber()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(12)
  semester: number;

  @ApiProperty()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isAutoAssign: boolean;
}
