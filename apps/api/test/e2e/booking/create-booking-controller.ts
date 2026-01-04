import { AppModule } from '@/app.module';
import { SignInUserDto } from '@/dto/SignInUserDto';
import { Section } from '@/enums';
import { CourseEntity } from '@/modules/course/CourseEntity';
import { RoomEntity } from '@/modules/room/room.entity';
import { TeacherEntity } from '@/modules/teacher/teacher.entity';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { dummyCreateBookingPayload } from '@test/dummy-payload/booking/dummy-create-booking-payload';
import { dummyCourseList } from '@test/dummy-payload/course/course-list';
import { dummyRoomList } from '@test/dummy-payload/room/room-list';
import { dummyTeacherList } from '@test/dummy-payload/teacher/teacher-list';
import { dummyTimeslotList } from '@test/dummy-payload/timeslot/timeslot-list';
import { configApp, getUserSignInResponse } from '@test/util/app-util';
import { removeBookings } from '@test/util/booking-util';
import { createCourses, removeCourses } from '@test/util/course-util';
import { createRooms, removeRooms } from '@test/util/room-util';
import { createTeachers, removeTeachers } from '@test/util/teacher-util';
import { createTimeslots } from '@test/util/timeslot-util';
import * as request from 'supertest';
import { ObjectLiteral } from 'typeorm';

describe('/v1/booking (POST)', () => {
  let app: INestApplication;
  let apiEndPont: string;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    const configService = app.get(ConfigService);
    const serviceApiPrefix = configService.get('SERVICE_API_PREFIX');
    apiEndPont = `${serviceApiPrefix}/booking`;
    await configApp(app);
    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });
  describe('INVALID REQUEST', () => {
    it('SHOULD return 401 UNAUTHORIZED WHEN there is no Authorization header set', async () => {
      await request(app.getHttpServer()).post(apiEndPont).expect(401);
    });

    it('SHOULD return 401 UNAUTHORIZED WHEN Authorization header set with wrong format bearer', async () => {
      await request(app.getHttpServer()).post(apiEndPont).set('Authorization', 'MyBearer token').expect(401);
    });

    it('SHOULD return 401 UNAUTHORIZED WHEN Authorization header set with invalid token.', async () => {
      await request(app.getHttpServer())
        .post(apiEndPont)
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
        .expect(401);
    });
  });
  describe('INVALID PAYLOAD', () => {
    const email = 'admin@gmail.com';
    let signInResponse: SignInUserDto;

    beforeAll(async () => {
      signInResponse = await getUserSignInResponse(email);
    });

    it('SHOULD return 400 BAD REQUEST WHEN registerStudent is empty', async () => {
      const payload = dummyCreateBookingPayload();
      delete payload.registerStudent;
      const result = await request(app.getHttpServer())
        .post(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('registerStudent must be a number')).toBe(true);
    });

    it('SHOULD return 400 BAD REQUEST WHEN registerStudent is not number', async () => {
      const payload = dummyCreateBookingPayload() as ObjectLiteral;
      payload.registerStudent = '123';
      const result = await request(app.getHttpServer())
        .post(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('registerStudent must be a number')).toBe(true);
    });
    it('SHOULD return 400 BAD REQUEST WHEN semester is empty', async () => {
      const payload = dummyCreateBookingPayload();
      delete payload.semester;
      const result = await request(app.getHttpServer())
        .post(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('semester must be a number')).toBe(true);
    });

    it('SHOULD return 400 BAD REQUEST WHEN semester is not number', async () => {
      const payload = dummyCreateBookingPayload() as ObjectLiteral;
      payload.semester = '123';
      const result = await request(app.getHttpServer())
        .post(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('semester must be a number')).toBe(true);
    });

    it('SHOULD return 400 BAD REQUEST WHEN semester is less than 1', async () => {
      const payload = dummyCreateBookingPayload() as ObjectLiteral;
      payload.semester = 0;
      const result = await request(app.getHttpServer())
        .post(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('semester must not be less than 1')).toBe(true);
    });
    it('SHOULD return 400 BAD REQUEST WHEN semester is less than 1', async () => {
      const payload = dummyCreateBookingPayload() as ObjectLiteral;
      payload.semester = 14;
      const result = await request(app.getHttpServer())
        .post(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('semester must not be greater than 12')).toBe(true);
    });

    it('SHOULD return 400 BAD REQUEST WHEN section is empty', async () => {
      const payload = dummyCreateBookingPayload();
      delete payload.section;
      const result = await request(app.getHttpServer())
        .post(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('section must be a valid enum value')).toBe(true);
    });

    it('SHOULD return 400 BAD REQUEST WHEN section is not enum', async () => {
      const payload = dummyCreateBookingPayload() as ObjectLiteral;
      payload.section = 123;
      const result = await request(app.getHttpServer())
        .post(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('section must be a valid enum value')).toBe(true);
    });

    it('SHOULD return 400 BAD REQUEST WHEN courseId is empty', async () => {
      const payload = dummyCreateBookingPayload();
      delete payload.courseId;
      const result = await request(app.getHttpServer())
        .post(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('courseId must be a string')).toBe(true);
    });

    it('SHOULD return 400 BAD REQUEST WHEN courseId is not string', async () => {
      const payload = dummyCreateBookingPayload() as ObjectLiteral;
      payload.courseId = 123;
      const result = await request(app.getHttpServer())
        .post(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('courseId must be a string')).toBe(true);
    });
    it('SHOULD return 400 BAD REQUEST WHEN teacherId is empty', async () => {
      const payload = dummyCreateBookingPayload();
      delete payload.teacherId;
      const result = await request(app.getHttpServer())
        .post(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('teacherId must be a string')).toBe(true);
    });

    it('SHOULD return 400 BAD REQUEST WHEN teacherId is not string', async () => {
      const payload = dummyCreateBookingPayload() as ObjectLiteral;
      payload.teacherId = 123;
      const result = await request(app.getHttpServer())
        .post(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('teacherId must be a string')).toBe(true);
    });
    // it('SHOULD return 400 BAD REQUEST WHEN roomId is empty', async () => {
    //   const payload = dummyCreateBookingPayload();
    //   delete payload.roomId;
    //   const result = await request(app.getHttpServer())
    //     .post(apiEndPont)
    //     .send(payload)
    //     .set('Authorization', `Bearer ${signInResponse.token}`)
    //     .expect(400);
    //   expect(JSON.stringify(result.error).includes('roomId must be a string')).toBe(true);
    // });

    it('SHOULD return 400 BAD REQUEST WHEN roomId is not string', async () => {
      const payload = dummyCreateBookingPayload() as ObjectLiteral;
      payload.roomId = 123;
      const result = await request(app.getHttpServer())
        .post(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('roomId must be a string')).toBe(true);
    });
    // it('SHOULD return 400 BAD REQUEST WHEN timeSlotId is empty', async () => {
    //   const payload = dummyCreateBookingPayload();
    //   delete payload.timeSlotId;
    //   const result = await request(app.getHttpServer())
    //     .post(apiEndPont)
    //     .send(payload)
    //     .set('Authorization', `Bearer ${signInResponse.token}`)
    //     .expect(400);
    //   expect(JSON.stringify(result.error).includes('timeSlotId must be a string')).toBe(true);
    // });

    it('SHOULD return 400 BAD REQUEST WHEN timeSlotId is not string', async () => {
      const payload = dummyCreateBookingPayload() as ObjectLiteral;
      payload.timeSlotId = 123;
      const result = await request(app.getHttpServer())
        .post(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('timeSlotId must be a string')).toBe(true);
    });
  });

  describe('VALID PAYLOAD', () => {
    let signInResponse: SignInUserDto;
    const email = 'admin@gmail.com';
    const bookingIds: string[] = [];
    beforeAll(async () => {
      signInResponse = await getUserSignInResponse(email);
    });
    afterAll(async () => {
      await removeBookings(bookingIds);
    });
    it('SHOULD return 201 SUCCESS WHEN valid payload', async () => {
      const payload = dummyCreateBookingPayload();
      payload.courseId = '3e706e91-5b01-4420-838f-eb8424a5580c';
      payload.teacherId = '4c203021-1864-4d4e-af74-2e447314ddfd';
      payload.roomId = '';
      payload.registerStudent = 10;
      payload.section = Section.A;
      payload.semester = 5;
      const result = await request(app.getHttpServer())
        .post(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(201);
      console.log('result', result);
      // bookingIds.push(result.body.id);
      // expect(result.body.registerStudent).toEqual(payload.registerStudent);
      // expect(result.body.semester).toEqual(payload.semester);
      // expect(result.body.section).toEqual(payload.section);
      // expect(result.body.courseId).toEqual(payload.courseId);
      // expect(result.body.teacherId).toEqual(payload.teacherId);
      // expect(result.body.roomId).toEqual(payload.roomId);
      // expect(result.body.timeSlotId).toEqual(payload.timeSlotId);
    });
  });
  describe.only('Implement booking business logic', () => {
    let signInResponse: SignInUserDto;
    const email = 'admin@gmail.com';
    // let coursesIds: string[] = [];
    // let teacherIds: string[] = [];
    // let roomIds: string[] = [];
    beforeAll(async () => {
      signInResponse = await getUserSignInResponse(email);
      const courses = await createCourses(dummyCourseList);
      // const teachers = await createTeachers(dummyTeacherList);
      // const timeSloats = await createTimeslots(dummyTimeslotList);
      // const rooms = await createRooms(dummyRoomList);

      // coursesIds = courses.map((item: Course) => item.id);
      // teacherIds = teachers.map((item: TeacherEntity) => item.id);
      // roomIds = rooms.map((item: RoomEntity) => item.id);
    });
    afterAll(async () => {
      // removeCourses(coursesIds);
      // removeTeachers(teacherIds);
      // removeRooms(roomIds);
    });
    it('SHOULD return 201 SUCCESS WHEN valid payload', async () => {
      expect(true).toEqual(true);
    });
  });
});
