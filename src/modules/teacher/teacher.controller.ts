import { JwtAuthGuard } from '@/auth/JwtAuthGuard';
import { CreateTeacherDto } from '@/dto/CreateTeacherDto';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TeacherEntity } from './teacher.entity';
import { TeacherService } from './teacher.service';

@Controller('teacher')
@ApiTags('Teacher')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Fetch all teacher' })
  @ApiResponse({ status: 200, description: 'Return all teacher' })
  @ApiResponse({ status: 401, description: 'UNAUTHORIZED' })
  @ApiResponse({ status: 403, description: 'FORBIDDEN' })
  getTeachers(): Promise<TeacherEntity[]> {
    return this.teacherService.getTeachers();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Create a Teacher' })
  @ApiResponse({ status: 201, description: 'Return a Teacher' })
  @ApiResponse({ status: 400, description: 'BAD REQUEST' })
  @ApiResponse({ status: 401, description: 'UNAUTHORIZED' })
  @ApiResponse({ status: 403, description: 'FORBIDDEN' })
  createTeacher(@Body() createTeacherDto: CreateTeacherDto): Promise<TeacherEntity> {
    return this.teacherService.createTeacher(createTeacherDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Update a Teacher' })
  @ApiResponse({ status: 200, description: 'Return a Teacher' })
  @ApiResponse({ status: 400, description: 'BAD REQUEST' })
  @ApiResponse({ status: 401, description: 'UNAUTHORIZED' })
  @ApiResponse({ status: 403, description: 'FORBIDDEN' })
  updateTeacher(@Param('id') id: string, @Body() createTeacherDto: CreateTeacherDto): Promise<TeacherEntity> {
    return this.teacherService.updateTeacher(id, createTeacherDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Delete an Teacher' })
  @ApiResponse({ status: 200, description: 'Delete Successfully' })
  @ApiResponse({ status: 400, description: 'BAD REQUEST' })
  @ApiResponse({ status: 401, description: 'UNAUTHORIZED' })
  @ApiResponse({ status: 403, description: 'FORBIDDEN' })
  deleteTeacher(@Param('id') id: string): Promise<void> {
    return this.teacherService.deleteTeacher(id);
  }
}
