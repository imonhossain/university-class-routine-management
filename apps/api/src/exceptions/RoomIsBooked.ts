import { BadRequestException } from '@nestjs/common';

export default class RoomIsBooked extends BadRequestException {
  constructor(roomNumber: string) {
    super({
      message: `Room ${roomNumber} is not free for`,
    });
  }
}
