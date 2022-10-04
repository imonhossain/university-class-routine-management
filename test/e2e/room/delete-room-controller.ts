import { AppModule } from '@/app.module';
import { SignInUserDto } from '@/dto/SignInUserDto';
import { RoomEntity } from '@/modules/room/room.entity';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { dummyCreateRoomPayload } from '@test/dummy-payload/room/dummy-create-room-payload';
import { configApp, getUserSignInResponse } from '@test/util/app-util';
import { createRoom } from '@test/util/room-util';
import * as request from 'supertest';

describe('/v1/room/:id (DELETE)', () => {
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
    room = await createRoom(dummyCreateRoomPayload());
    apiEndPont = `${serviceApiPrefix}/room/`;
    apiEndPont = apiEndPont + room.id;
    await configApp(app);
    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });
  describe('INVALID REQUEST', () => {
    it('SHOULD return 401 UNAUTHORIZED WHEN there is no Authorization header set', async () => {
      await request(app.getHttpServer()).delete(apiEndPont).expect(401);
    });

    it('SHOULD return 401 UNAUTHORIZED WHEN Authorization header set with wrong format bearer', async () => {
      await request(app.getHttpServer()).delete(apiEndPont).set('Authorization', 'MyBearer token').expect(401);
    });

    it('SHOULD return 401 UNAUTHORIZED WHEN Authorization header set with invalid token.', async () => {
      await request(app.getHttpServer())
        .delete(apiEndPont)
        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
        .expect(401);
    });
  });

  describe('VALID PAYLOAD', () => {
    let signInResponse: SignInUserDto;
    const email = 'admin@gmail.com';
    beforeAll(async () => {
      signInResponse = await getUserSignInResponse(email);
    });

    it('SHOULD return 200 SUCCESS WHEN valid payload', async () => {
      const result = await request(app.getHttpServer())
        .delete(apiEndPont)
        .set('Authorization', `Bearer ${signInResponse.token}`)
        .expect(200);
      expect(result.status).toEqual(200);
    });
  });
});
