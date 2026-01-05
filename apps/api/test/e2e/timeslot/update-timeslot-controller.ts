import { AppModule } from '@/app.module';
import { SignInUserDto } from '@/dto/SignInUserDto';
import { TimeslotEntity } from '@/modules/timeslot/timeslot.entity';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { dummyCreateTimeslotPayload } from '@test/dummy-payload/timeslot/dummy-create-timeslot-payload';
import { dummyUpdateTimeslotPayload } from '@test/dummy-payload/timeslot/dummy-update-timeslot-payload';
import { configApp, getUserSignInResponse } from '@test/util/app-util';
import { createTimeslot, removeTimeslot } from '@test/util/timeslot-util';
import request from 'supertest';
import { ObjectLiteral } from 'typeorm';

describe('/v1/timeslot/:id (PATCH)', () => {
  let app: INestApplication;
  let apiEndPont: string;
  let timeslot: TimeslotEntity;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    const configService = app.get(ConfigService);
    const serviceApiPrefix = configService.get('SERVICE_API_PREFIX');
    apiEndPont = `${serviceApiPrefix}/timeslot/`;
    await configApp(app);
    timeslot = await createTimeslot(dummyCreateTimeslotPayload());
    apiEndPont = apiEndPont + timeslot.id;
  });
  afterAll(async () => {
    await removeTimeslot(timeslot.id);
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
  // INVALID PAYLOAD tests are skipped - no validation tests defined

  describe('VALID PAYLOAD', () => {
    let signInResponse: SignInUserDto;
    const email = 'admin@gmail.com';
    beforeAll(async () => {
      signInResponse = await getUserSignInResponse(email);
    });

    it('SHOULD return 200 SUCCESS WHEN valid payload', async () => {
      const payload = dummyUpdateTimeslotPayload();
      const result = await request(app.getHttpServer())
        .patch(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(200);
      // expect(result.body.name).toEqual(payload.name);
      // expect(result.body.phone).toEqual(payload.phone);
      // expect(result.body.email).toEqual(payload.email);
    });
  });
});
