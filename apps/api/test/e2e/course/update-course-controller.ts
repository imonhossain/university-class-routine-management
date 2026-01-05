import { AppModule } from '@/app.module';
import { SignInUserDto } from '@/dto/SignInUserDto';
import { CourseEntity } from '@/modules/course/CourseEntity';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { dummyCreateCoursePayload } from '@test/dummy-payload/course/dummy-create-course-payload';
import { dummyUpdateCoursePayload } from '@test/dummy-payload/course/dummy-update-course-payload';
import { configApp, getUserSignInResponse } from '@test/util/app-util';
import { createCourse, removeCourse } from '@test/util/course-util';
import request from 'supertest';
import { ObjectLiteral } from 'typeorm';

describe('/v1/course/:id (PATCH)', () => {
  let app: INestApplication;
  let apiEndPont: string;
  let course: CourseEntity;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    const configService = app.get(ConfigService);
    const serviceApiPrefix = configService.get('SERVICE_API_PREFIX');
    apiEndPont = `${serviceApiPrefix}/course/`;
    await configApp(app);
    course = await createCourse(dummyCreateCoursePayload());
    apiEndPont = apiEndPont + course.id;
  });
  afterAll(async () => {
    await removeCourse(course.id);
    await app.close();
  });
  describe('INVALID REQUEST', () => {
    it('SHOULD return 401 UNAUTHORIZED WHEN there is no Authorization header set', async () => {
      await request(app.getHttpServer()).patch(apiEndPont).expect(401);
    });

    it('SHOULD return 401 UNAUTHORIZED WHEN Authorization header set with wrong format bearer', async () => {
      await request(app.getHttpServer()).patch(apiEndPont).set('Authorization', 'MyBearer token').expect(401);
    });

    it('SHOULD return 401 UNAUTHORIZED WHEN Authorization header set with invalid token.', async () => {
      await request(app.getHttpServer())
        .patch(apiEndPont)
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

    it('SHOULD return 400 BAD REQUEST WHEN name is empty', async () => {
      const payload = dummyCreateCoursePayload();
      delete payload.name;
      const result = await request(app.getHttpServer())
        .patch(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('name must be a string')).toBe(true);
    });

    it('SHOULD return 400 BAD REQUEST WHEN name is not string', async () => {
      const payload = dummyCreateCoursePayload() as ObjectLiteral;
      payload.name = 123;
      const result = await request(app.getHttpServer())
        .patch(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('name must be a string')).toBe(true);
    });

    it('SHOULD return 400 BAD REQUEST WHEN code is empty', async () => {
      const payload = dummyCreateCoursePayload();
      delete payload.code;
      const result = await request(app.getHttpServer())
        .patch(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('code must be a string')).toBe(true);
    });

    it('SHOULD return 400 BAD REQUEST WHEN code is not string', async () => {
      const payload = dummyCreateCoursePayload() as ObjectLiteral;
      payload.code = 123;
      const result = await request(app.getHttpServer())
        .patch(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('code must be a string')).toBe(true);
    });

    it('SHOULD return 400 BAD REQUEST WHEN department is empty', async () => {
      const payload = dummyCreateCoursePayload();
      delete payload.department;
      const result = await request(app.getHttpServer())
        .patch(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('department must be a valid enum value')).toBe(true);
    });

    it('SHOULD return 400 BAD REQUEST WHEN department is not string', async () => {
      const payload = dummyCreateCoursePayload() as ObjectLiteral;
      payload.department = 123;
      const result = await request(app.getHttpServer())
        .patch(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('department must be a valid enum value')).toBe(true);
    });

    it('SHOULD return 400 BAD REQUEST WHEN credit is empty', async () => {
      const payload = dummyCreateCoursePayload();
      delete payload.credit;
      const result = await request(app.getHttpServer())
        .patch(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('credit must be a number')).toBe(true);
    });

    it('SHOULD return 400 BAD REQUEST WHEN credit is not number', async () => {
      const payload = dummyCreateCoursePayload() as ObjectLiteral;
      payload.credit = '123';
      const result = await request(app.getHttpServer())
        .patch(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('credit must be a number')).toBe(true);
    });

    it('SHOULD return 400 BAD REQUEST WHEN credit is less than 1', async () => {
      const payload = dummyCreateCoursePayload() as ObjectLiteral;
      payload.credit = 0;
      const result = await request(app.getHttpServer())
        .patch(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('credit must not be less than 1')).toBe(true);
    });

    it('SHOULD return 400 BAD REQUEST WHEN credit is greater than 4', async () => {
      const payload = dummyCreateCoursePayload() as ObjectLiteral;
      payload.credit = 100;
      const result = await request(app.getHttpServer())
        .patch(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('credit must not be greater than 4')).toBe(true);
    });

    it('SHOULD return 400 BAD REQUEST WHEN semester is empty', async () => {
      const payload = dummyCreateCoursePayload();
      delete payload.semester;
      const result = await request(app.getHttpServer())
        .patch(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('semester must be a number')).toBe(true);
    });

    it('SHOULD return 400 BAD REQUEST WHEN semester is not number', async () => {
      const payload = dummyCreateCoursePayload() as ObjectLiteral;
      payload.semester = '123';
      const result = await request(app.getHttpServer())
        .patch(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('semester must be a number')).toBe(true);
    });

    it('SHOULD return 400 BAD REQUEST WHEN semester is less than 1', async () => {
      const payload = dummyCreateCoursePayload() as ObjectLiteral;
      payload.semester = 0;
      const result = await request(app.getHttpServer())
        .patch(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('semester must not be less than 1')).toBe(true);
    });

    it('SHOULD return 400 BAD REQUEST WHEN semester is greater than 12', async () => {
      const payload = dummyCreateCoursePayload() as ObjectLiteral;
      payload.semester = 100;
      const result = await request(app.getHttpServer())
        .patch(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('semester must not be greater than 12')).toBe(true);
    });

    it('SHOULD return 400 BAD REQUEST WHEN isAutoAssign is empty', async () => {
      const payload = dummyCreateCoursePayload();
      delete payload.isAutoAssign;
      const result = await request(app.getHttpServer())
        .patch(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('isAutoAssign must be a boolean')).toBe(true);
    });

    it('SHOULD return 400 BAD REQUEST WHEN isAutoAssign is not boolean', async () => {
      const payload = dummyCreateCoursePayload() as ObjectLiteral;
      payload.isAutoAssign = '123';
      const result = await request(app.getHttpServer())
        .patch(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('isAutoAssign must be a boolean')).toBe(true);
    });
  });

  describe('VALID PAYLOAD', () => {
    let signInResponse: SignInUserDto;
    const email = 'admin@gmail.com';
    beforeAll(async () => {
      signInResponse = await getUserSignInResponse(email);
    });

    it('SHOULD return 200 SUCCESS WHEN valid payload', async () => {
      const payload = dummyUpdateCoursePayload();
      const result = await request(app.getHttpServer())
        .patch(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(200);
      expect(result.body.code).toEqual(payload.code);
      expect(result.body.name).toEqual(payload.name);
      expect(result.body.department).toEqual(payload.department);
      expect(result.body.semester).toEqual(payload.semester);
      expect(result.body.isAutoAssign).toEqual(payload.isAutoAssign);
    });
  });
});
