import { JwtAuthGuard } from '@/auth/JwtAuthGuard';
import { CreateBookingDto } from '@/dto/CreateBookingDto';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookingEntity } from './booking.entity';
import { BookingService } from './booking.service';

@Controller('booking')
@ApiTags('Booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Fetch all booking' })
  @ApiResponse({ status: 200, description: 'Return all booking' })
  @ApiResponse({ status: 401, description: 'UNAUTHORIZED' })
  @ApiResponse({ status: 403, description: 'FORBIDDEN' })
  getBookings(): Promise<BookingEntity[]> {
    return this.bookingService.getBookings();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Create a Booking' })
  @ApiResponse({ status: 201, description: 'Return a Booking' })
  @ApiResponse({ status: 400, description: 'BAD REQUEST' })
  @ApiResponse({ status: 401, description: 'UNAUTHORIZED' })
  @ApiResponse({ status: 403, description: 'FORBIDDEN' })
  createBooking(@Body() createBookingDto: CreateBookingDto): Promise<BookingEntity> {
    return this.bookingService.createBooking(createBookingDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Update a Booking' })
  @ApiResponse({ status: 200, description: 'Return a Booking' })
  @ApiResponse({ status: 400, description: 'BAD REQUEST' })
  @ApiResponse({ status: 401, description: 'UNAUTHORIZED' })
  @ApiResponse({ status: 403, description: 'FORBIDDEN' })
  updateBooking(@Param('id') id: string, @Body() createBookingDto: CreateBookingDto): Promise<BookingEntity> {
    return this.bookingService.updateBooking(id, createBookingDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Delete an Booking' })
  @ApiResponse({ status: 200, description: 'Delete Successfully' })
  @ApiResponse({ status: 400, description: 'BAD REQUEST' })
  @ApiResponse({ status: 401, description: 'UNAUTHORIZED' })
  @ApiResponse({ status: 403, description: 'FORBIDDEN' })
  deleteBooking(@Param('id') id: string): Promise<void> {
    return this.bookingService.deleteBooking(id);
  }
}
