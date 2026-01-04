import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { SignInDto } from '@/dto/SignInDto';
import { expiresIn } from '@/common/Constant';
import { SignInUserDto } from '@/dto/SignInUserDto';
import { User } from '@/entities/User';
import { UserStatusType } from '@/enums';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signIn(signInDto: SignInDto): Promise<SignInUserDto> {
    const user = await this.userRepository.findOne({ where: { email: signInDto.email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.status !== UserStatusType.ACTIVE) {
      throw new NotFoundException('User is not ACTIVE');
    }
    return this.createToken(user, signInDto);
  }

  async createToken(user: User, signInDto: SignInDto): Promise<SignInUserDto> {
    /* eslint-disable node/no-sync */
    const secretKey = this.configService.get('SECRET_KEY');
    const isMatch = await bcrypt.compareSync(signInDto.password, user.password);
    if (isMatch) {
      delete user.password;
      const token = jwt.sign({ user }, secretKey, { expiresIn });
      return { ...user, token } as SignInUserDto;
    }
    throw new BadRequestException('Wrong username or password');
  }
}
