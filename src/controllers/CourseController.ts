import { JwtAuthGuard } from '@/auth/JwtAuthGuard';
import { CreateCourseDto } from '@/dto/CreateCourseDto';
import { Course } from '@/entities/Course';
import { CourseService } from '@/services/CourseService';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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
  getCourses(): Promise<Course[]> {
    return this.courseService.getCourses();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Create an Course' })
  @ApiResponse({ status: 201, description: 'Return an Course' })
  @ApiResponse({ status: 400, description: 'BAD REQUEST' })
  @ApiResponse({ status: 401, description: 'UNAUTHORIZED' })
  @ApiResponse({ status: 403, description: 'FORBIDDEN' })
  createOrganization(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.courseService.createCourse(createCourseDto);
  }
}
