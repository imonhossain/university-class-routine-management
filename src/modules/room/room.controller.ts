import { JwtAuthGuard } from '@/auth/JwtAuthGuard';
import { CreateRoomDto } from '@/dto/CreateRoomDto';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoomEntity } from './room.entity';
import { RoomService } from './room.service';

@Controller('room')
@ApiTags('Room')
export class RoomController {
  constructor(private roomService: RoomService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Fetch all room' })
  @ApiResponse({ status: 200, description: 'Return all room' })
  @ApiResponse({ status: 401, description: 'UNAUTHORIZED' })
  @ApiResponse({ status: 403, description: 'FORBIDDEN' })
  getRooms(): Promise<RoomEntity[]> {
    return this.roomService.getRooms();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Create a Room' })
  @ApiResponse({ status: 201, description: 'Return a Room' })
  @ApiResponse({ status: 400, description: 'BAD REQUEST' })
  @ApiResponse({ status: 401, description: 'UNAUTHORIZED' })
  @ApiResponse({ status: 403, description: 'FORBIDDEN' })
  createRoom(@Body() createRoomDto: CreateRoomDto): Promise<RoomEntity> {
    return this.roomService.createRoom(createRoomDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Update a Room' })
  @ApiResponse({ status: 200, description: 'Return a Room' })
  @ApiResponse({ status: 400, description: 'BAD REQUEST' })
  @ApiResponse({ status: 401, description: 'UNAUTHORIZED' })
  @ApiResponse({ status: 403, description: 'FORBIDDEN' })
  updateRoom(@Param('id') id: string, @Body() createRoomDto: CreateRoomDto): Promise<RoomEntity> {
    return this.roomService.updateRoom(id, createRoomDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Delete an Room' })
  @ApiResponse({ status: 200, description: 'Delete Successfully' })
  @ApiResponse({ status: 400, description: 'BAD REQUEST' })
  @ApiResponse({ status: 401, description: 'UNAUTHORIZED' })
  @ApiResponse({ status: 403, description: 'FORBIDDEN' })
  deleteRoom(@Param('id') id: string): Promise<void> {
    return this.roomService.deleteRoom(id);
  }
}
