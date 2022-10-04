/* eslint-disable node/no-process-env */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { expiresIn } from './common/Constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/AuthController';
import { AuthService } from './services/AuthService';
import { JwtStrategy } from './auth/JwtStrategy';
import TypeOrmConfig from './configs/TypeOrmConfig';
import { User } from './entities/User';
import { CourseModule } from './modules/course/course.module';
import { RoomModule } from './modules/room/room.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({ useFactory: () => TypeOrmConfig }),
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn },
    }),
    CourseModule,
    RoomModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AppModule {}
