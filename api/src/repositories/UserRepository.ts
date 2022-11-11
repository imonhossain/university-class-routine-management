import { User } from '@/entities/User';
import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';

@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User> {
    return this.findOne({ where: { email } });
  }
}
