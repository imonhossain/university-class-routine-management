import { AppModule } from '@/app.module';
import { SignInUserDto } from '@/dto/SignInUserDto';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { dummyCreateCoursePayload } from '@test/dummy-payload/dummy-create-course-payload';
import { configApp, getUserSignInResponse } from '@test/util/app-util';
import { removeCourses } from '@test/util/course-util';
import * as request from 'supertest';

describe('/v1/organizations (POST)', () => {
  let app: INestApplication;
  let apiEndPont: string;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    const configService = app.get(ConfigService);
    const serviceApiPrefix = configService.get('SERVICE_API_PREFIX');
    apiEndPont = `${serviceApiPrefix}/course`;
    await configApp(app);
    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });
  describe('VALID PAYLOAD', () => {
    let signInResponse: SignInUserDto;
    const email = 'admin@gmail.com';
    const courseIds: string[] = [];
    beforeAll(async () => {
      signInResponse = await getUserSignInResponse(email);
    });
    afterAll(async () => {
      await removeCourses(courseIds);
    });
    it('SHOULD return 201 SUCCESS WHEN valid payload', async () => {
      const payload = dummyCreateCoursePayload();
      const result = await request(app.getHttpServer())
        .post(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(201);
      courseIds.push(result.body.id);
      expect(result.body.code).toEqual(payload.code);
      expect(result.body.name).toEqual(payload.name);
      expect(result.body.department).toEqual(payload.department);
      expect(result.body.semester).toEqual(payload.semester);
      expect(result.body.isAutoAssign).toEqual(payload.isAutoAssign);
    });
  });
});
