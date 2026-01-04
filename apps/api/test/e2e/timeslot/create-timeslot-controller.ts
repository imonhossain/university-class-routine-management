import { AppModule } from '@/app.module';
import { SignInUserDto } from '@/dto/SignInUserDto';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { dummyCreateTimeslotPayload } from '@test/dummy-payload/timeslot/dummy-create-timeslot-payload';
import { configApp, getUserSignInResponse } from '@test/util/app-util';
import { removeTimeslots } from '@test/util/timeslot-util';
import * as request from 'supertest';
import { ObjectLiteral } from 'typeorm';

describe('/v1/timeslot (POST)', () => {
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

    // it('SHOULD return 400 BAD REQUEST WHEN name is empty', async () => {
    //   const payload = dummyCreateTimeslotPayload();
    //   delete payload.name;
    //   const result = await request(app.getHttpServer())
    //     .post(apiEndPont)
    //     .send(payload)
    //     .set('Authorization', `Bearer ${signInResponse.token}`)
    //     .expect(400);
    //   expect(JSON.stringify(result.error).includes('name must be a string')).toBe(true);
    // });

    // it('SHOULD return 400 BAD REQUEST WHEN name is not string', async () => {
    //   const payload = dummyCreateTimeslotPayload() as ObjectLiteral;
    //   payload.name = 123;
    //   const result = await request(app.getHttpServer())
    //     .post(apiEndPont)
    //     .send(payload)
    //     .set('Authorization', `Bearer ${signInResponse.token}`)
    //     .expect(400);
    //   expect(JSON.stringify(result.error).includes('name must be a string')).toBe(true);
    // });

    // it('SHOULD return 400 BAD REQUEST WHEN phone is empty', async () => {
    //   const payload = dummyCreateTimeslotPayload();
    //   delete payload.phone;
    //   const result = await request(app.getHttpServer())
    //     .post(apiEndPont)
    //     .send(payload)
    //     .set('Authorization', `Bearer ${signInResponse.token}`)
    //     .expect(400);
    //   expect(JSON.stringify(result.error).includes('phone must be a string')).toBe(true);
    // });

    // it('SHOULD return 400 BAD REQUEST WHEN phone is not string', async () => {
    //   const payload = dummyCreateTimeslotPayload() as ObjectLiteral;
    //   payload.phone = 123;
    //   const result = await request(app.getHttpServer())
    //     .post(apiEndPont)
    //     .send(payload)
    //     .set('Authorization', `Bearer ${signInResponse.token}`)
    //     .expect(400);
    //   expect(JSON.stringify(result.error).includes('phone must be a string')).toBe(true);
    // });

    // it('SHOULD return 400 BAD REQUEST WHEN email is empty', async () => {
    //   const payload = dummyCreateTimeslotPayload();
    //   delete payload.email;
    //   const result = await request(app.getHttpServer())
    //     .post(apiEndPont)
    //     .send(payload)
    //     .set('Authorization', `Bearer ${signInResponse.token}`)
    //     .expect(400);
    //   expect(JSON.stringify(result.error).includes('email must be a string')).toBe(true);
    // });

    // it('SHOULD return 400 BAD REQUEST WHEN email is not string', async () => {
    //   const payload = dummyCreateTimeslotPayload() as ObjectLiteral;
    //   payload.email = 123;
    //   const result = await request(app.getHttpServer())
    //     .post(apiEndPont)
    //     .send(payload)
    //     .set('Authorization', `Bearer ${signInResponse.token}`)
    //     .expect(400);
    //   expect(JSON.stringify(result.error).includes('email must be a string')).toBe(true);
    // });
  });

  describe('VALID PAYLOAD', () => {
    let signInResponse: SignInUserDto;
    const email = 'admin@gmail.com';
    const timeslotIds: string[] = [];
    beforeAll(async () => {
      signInResponse = await getUserSignInResponse(email);
    });
    afterAll(async () => {
      await removeTimeslots(timeslotIds);
    });
    it('SHOULD return 201 SUCCESS WHEN valid payload', async () => {
      const payload = dummyCreateTimeslotPayload();
      const result = await request(app.getHttpServer())
        .post(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(201);
      timeslotIds.push(result.body.id);
      // expect(result.body.name).toEqual(payload.name);
      // expect(result.body.phone).toEqual(payload.phone);
      // expect(result.body.email).toEqual(payload.email);
    });
  });
});
