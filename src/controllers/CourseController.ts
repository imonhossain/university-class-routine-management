import { JwtAuthGuard } from '@/auth/JwtAuthGuard';
import { Course } from '@/entities/Course';
import { CourseService } from '@/services/CourseService';
import { Controller, Get, UseGuards } from '@nestjs/common';
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
}
