import { JwtAuthGuard } from '@/auth/JwtAuthGuard';
import { CreateTimeslotDto } from '@/dto/CreateTimeslotDto';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TimeslotEntity } from './timeslot.entity';
import { TimeslotService } from './timeslot.service';

@Controller('timeslot')
@ApiTags('Timeslot')
export class TimeslotController {
  constructor(private timeslotService: TimeslotService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Fetch all timeslot' })
  @ApiResponse({ status: 200, description: 'Return all timeslot' })
  @ApiResponse({ status: 401, description: 'UNAUTHORIZED' })
  @ApiResponse({ status: 403, description: 'FORBIDDEN' })
  getTimeslots(): Promise<TimeslotEntity[]> {
    return this.timeslotService.getTimeslots();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Create a Timeslot' })
  @ApiResponse({ status: 201, description: 'Return a Timeslot' })
  @ApiResponse({ status: 400, description: 'BAD REQUEST' })
  @ApiResponse({ status: 401, description: 'UNAUTHORIZED' })
  @ApiResponse({ status: 403, description: 'FORBIDDEN' })
  createTimeslot(@Body() createTimeslotDto: CreateTimeslotDto): Promise<TimeslotEntity> {
    return this.timeslotService.createTimeslot(createTimeslotDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Update a Timeslot' })
  @ApiResponse({ status: 200, description: 'Return a Timeslot' })
  @ApiResponse({ status: 400, description: 'BAD REQUEST' })
  @ApiResponse({ status: 401, description: 'UNAUTHORIZED' })
  @ApiResponse({ status: 403, description: 'FORBIDDEN' })
  updateTimeslot(@Param('id') id: string, @Body() createTimeslotDto: CreateTimeslotDto): Promise<TimeslotEntity> {
    return this.timeslotService.updateTimeslot(id, createTimeslotDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Delete an Timeslot' })
  @ApiResponse({ status: 200, description: 'Delete Successfully' })
  @ApiResponse({ status: 400, description: 'BAD REQUEST' })
  @ApiResponse({ status: 401, description: 'UNAUTHORIZED' })
  @ApiResponse({ status: 403, description: 'FORBIDDEN' })
  deleteTimeslot(@Param('id') id: string): Promise<void> {
    return this.timeslotService.deleteTimeslot(id);
  }
}
