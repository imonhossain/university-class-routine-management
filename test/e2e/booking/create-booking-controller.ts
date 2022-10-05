import { AppModule } from '@/app.module';
import { SignInUserDto } from '@/dto/SignInUserDto';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { dummyCreateBookingPayload } from '@test/dummy-payload/booking/dummy-create-booking-payload';
import { configApp, getUserSignInResponse } from '@test/util/app-util';
import { removeBookings } from '@test/util/booking-util';
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
    it('SHOULD return 400 BAD REQUEST WHEN roomId is empty', async () => {
      const payload = dummyCreateBookingPayload();
      delete payload.roomId;
      const result = await request(app.getHttpServer())
        .post(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('roomId must be a string')).toBe(true);
    });

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
    it('SHOULD return 400 BAD REQUEST WHEN timeSlotId is empty', async () => {
      const payload = dummyCreateBookingPayload();
      delete payload.timeSlotId;
      const result = await request(app.getHttpServer())
        .post(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('timeSlotId must be a string')).toBe(true);
    });

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
      const result = await request(app.getHttpServer())
        .post(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(201);
      bookingIds.push(result.body.id);
      expect(result.body.registerStudent).toEqual(payload.registerStudent);
      expect(result.body.semester).toEqual(payload.semester);
      expect(result.body.section).toEqual(payload.section);
      expect(result.body.courseId).toEqual(payload.courseId);
      expect(result.body.teacherId).toEqual(payload.teacherId);
      expect(result.body.roomId).toEqual(payload.roomId);
      expect(result.body.timeSlotId).toEqual(payload.timeSlotId);
    });
  });
});
