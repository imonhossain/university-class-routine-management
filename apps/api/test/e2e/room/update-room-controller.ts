import { AppModule } from '@/app.module';
import { SignInUserDto } from '@/dto/SignInUserDto';
import { RoomEntity } from '@/modules/room/room.entity';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { dummyCreateRoomPayload } from '@test/dummy-payload/room/dummy-create-room-payload';
import { dummyUpdateRoomPayload } from '@test/dummy-payload/room/dummy-update-room-payload';
import { configApp, getUserSignInResponse } from '@test/util/app-util';
import { createRoom, removeRoom } from '@test/util/room-util';
import * as request from 'supertest';
import { ObjectLiteral } from 'typeorm';

describe('/v1/room/:id (PATCH)', () => {
  let app: INestApplication;
  let apiEndPont: string;
  let room: RoomEntity;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    const configService = app.get(ConfigService);
    const serviceApiPrefix = configService.get('SERVICE_API_PREFIX');
    apiEndPont = `${serviceApiPrefix}/room/`;
    await configApp(app);
    await app.init();
    room = await createRoom(dummyCreateRoomPayload());
    apiEndPont = apiEndPont + room.id;
  });
  afterAll(async () => {
    await removeRoom(room.id);
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

    it('SHOULD return 400 BAD REQUEST WHEN number is empty', async () => {
      const payload = dummyCreateRoomPayload();
      delete payload.number;
      const result = await request(app.getHttpServer())
        .patch(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('number must be a string')).toBe(true);
    });

    it('SHOULD return 400 BAD REQUEST WHEN number is not string', async () => {
      const payload = dummyCreateRoomPayload() as ObjectLiteral;
      payload.number = 123;
      const result = await request(app.getHttpServer())
        .patch(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('number must be a string')).toBe(true);
    });

    it('SHOULD return 400 BAD REQUEST WHEN capacity is empty', async () => {
      const payload = dummyCreateRoomPayload();
      delete payload.capacity;
      const result = await request(app.getHttpServer())
        .patch(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('capacity must be a number')).toBe(true);
    });

    it('SHOULD return 400 BAD REQUEST WHEN capacity is not number', async () => {
      const payload = dummyCreateRoomPayload() as ObjectLiteral;
      payload.capacity = '123';
      const result = await request(app.getHttpServer())
        .patch(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('capacity must be a number')).toBe(true);
    });

    it('SHOULD return 400 BAD REQUEST WHEN capacity is less than 1', async () => {
      const payload = dummyCreateRoomPayload() as ObjectLiteral;
      payload.capacity = 0;
      const result = await request(app.getHttpServer())
        .patch(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('capacity must not be less than 1')).toBe(true);
    });

    it('SHOULD return 400 BAD REQUEST WHEN isAutoAssign is empty', async () => {
      const payload = dummyCreateRoomPayload();
      delete payload.isAutoAssign;
      const result = await request(app.getHttpServer())
        .patch(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(400);
      expect(JSON.stringify(result.error).includes('isAutoAssign must be a boolean')).toBe(true);
    });

    it('SHOULD return 400 BAD REQUEST WHEN isAutoAssign is not boolean', async () => {
      const payload = dummyCreateRoomPayload() as ObjectLiteral;
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
      const payload = dummyUpdateRoomPayload();
      const result = await request(app.getHttpServer())
        .patch(apiEndPont)
        .send(payload)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(200);
      expect(result.body.number).toEqual(payload.number);
      expect(result.body.capacity).toEqual(payload.capacity);
      expect(result.body.isAutoAssign).toEqual(payload.isAutoAssign);
    });
  });
});
