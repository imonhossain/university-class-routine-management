import { AppModule } from '@/app.module';
import { SignInUserDto } from '@/dto/SignInUserDto';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { dummyCreateTimeslotPayload } from '@test/dummy-payload/timeslot/dummy-create-timeslot-payload';
import { configApp, getUserSignInResponse } from '@test/util/app-util';
import { createTimeslot, removeTimeslots } from '@test/util/timeslot-util';
import * as request from 'supertest';

describe('/v1/timeslot (GET)', () => {
  let app: INestApplication;
  let apiEndPont: string;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    const configService = app.get(ConfigService);
    const serviceApiPrefix = configService.get('SERVICE_API_PREFIX');
    apiEndPont = `${serviceApiPrefix}/timeslot`;
    await configApp(app);
    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });
  describe('INVALID REQUEST', () => {
    it('SHOULD return 401 UNAUTHORIZED WHEN there is no Authorization header set', async () => {
      await request(app.getHttpServer()).get(apiEndPont).expect(401);
    });

    it('SHOULD return 401 UNAUTHORIZED WHEN Authorization header set with wrong format bearer', async () => {
      await request(app.getHttpServer()).get(apiEndPont).set('Authorization', 'MyBearer token').expect(401);
    });

    it('SHOULD return 401 UNAUTHORIZED WHEN Authorization header set with invalid token.', async () => {
      await request(app.getHttpServer())
        .get(apiEndPont)
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
        .expect(401);
    });
  });

  describe('VALID PAYLOAD', () => {
    let signInResponse: SignInUserDto;
    const email = 'admin@gmail.com';
    const timeslotIds: string[] = [];
    beforeAll(async () => {
      signInResponse = await getUserSignInResponse(email);
      for (let i = 0; i < 3; i++) {
        const timeslot = await createTimeslot(dummyCreateTimeslotPayload());
        timeslotIds.push(timeslot.id);
      }
    });
    afterAll(async () => {
      await removeTimeslots(timeslotIds);
    });
    it('SHOULD return 200 SUCCESS WHEN valid payload', async () => {
      const result = await request(app.getHttpServer())
        .get(apiEndPont)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(200);
      expect(result.body.length).toBeGreaterThan(2);
    });
  });
});
