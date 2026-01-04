import { BadRequestException } from '@nestjs/common';

export default class TimeSlotIsNotFree extends BadRequestException {
  constructor(registerStudent: number) {
    super({
      message: `Time slot is not free for ${registerStudent} students`,
    });
  }
}
