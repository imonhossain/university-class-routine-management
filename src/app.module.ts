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
import { CourseController } from './controllers/CourseController';
import { Course } from './entities/Course';
import { CourseService } from './services/CourseService';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({ useFactory: () => TypeOrmConfig }),
    TypeOrmModule.forFeature([User, Course]),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn },
    }),
  ],
  controllers: [AuthController, CourseController],
  providers: [AuthService, JwtStrategy, CourseService],
})
export class AppModule {}
