import { JwtAuthGuard } from '@/auth/JwtAuthGuard';
import { CreateCourseDto } from '@/dto/CreateCourseDto';
import { CourseEntity } from '@/modules/course/CourseEntity';
import { CourseService } from '@/modules/course/CourseService';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('course')
@ApiTags('Course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Fetch all course' })
  @ApiResponse({ status: 200, description: 'Return all course' })
  @ApiResponse({ status: 401, description: 'UNAUTHORIZED' })
  @ApiResponse({ status: 403, description: 'FORBIDDEN' })
  getCourses(): Promise<CourseEntity[]> {
    return this.courseService.getCourses();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Create a Course' })
  @ApiResponse({ status: 201, description: 'Return a Course' })
  @ApiResponse({ status: 400, description: 'BAD REQUEST' })
  @ApiResponse({ status: 401, description: 'UNAUTHORIZED' })
  @ApiResponse({ status: 403, description: 'FORBIDDEN' })
  createCourse(@Body() createCourseDto: CreateCourseDto): Promise<CourseEntity> {
    return this.courseService.createCourse(createCourseDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Update a Course' })
  @ApiResponse({ status: 200, description: 'Return a Course' })
  @ApiResponse({ status: 400, description: 'BAD REQUEST' })
  @ApiResponse({ status: 401, description: 'UNAUTHORIZED' })
  @ApiResponse({ status: 403, description: 'FORBIDDEN' })
  updateCourse(@Param('id') id: string, @Body() createCourseDto: CreateCourseDto): Promise<CourseEntity> {
    return this.courseService.updateCourse(id, createCourseDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Delete an Course' })
  @ApiResponse({ status: 200, description: 'Delete Successfully' })
  @ApiResponse({ status: 400, description: 'BAD REQUEST' })
  @ApiResponse({ status: 401, description: 'UNAUTHORIZED' })
  @ApiResponse({ status: 403, description: 'FORBIDDEN' })
  deleteCourse(@Param('id') id: string): Promise<void> {
    return this.courseService.deleteCourse(id);
  }
}
