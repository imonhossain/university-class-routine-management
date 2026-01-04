import { AppModule } from '@/app.module';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { configApp } from '@test/util/app-util';
import * as request from 'supertest';

describe('/auth/sign-in (POST)', () => {
  let app: INestApplication;
  let apiEndPont: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const configService = app.get(ConfigService);

    const serviceApiPrefix = configService.get('SERVICE_API_PREFIX');
    apiEndPont = `${serviceApiPrefix}/auth/sign-in`;
    await configApp(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });
  describe('INVALID PAYLOAD', () => {
    it('SHOULD return 400 if payload is invalid', async () => {
      await request(app.getHttpServer())
        .post(apiEndPont)
        .send({
          name: 'Jhon doe',
          phone: '123345',
        })
        .expect(400);
    });

    it('SHOULD return 400 if invalid email format will provide', async () => {
      await request(app.getHttpServer())
        .post(apiEndPont)
        .send({
          email: 'Jhon doe',
          password: '1qweqwe23',
        })
        .expect(400);
    });

    it('SHOULD return 400 if email provide empty', async () => {
      await request(app.getHttpServer())
        .post(apiEndPont)
        .send({
          email: '',
          password: '1qweqwe23',
        })
        .expect(400);
    });
    it('SHOULD return 400 if password provide empty', async () => {
      await request(app.getHttpServer())
        .post(apiEndPont)
        .send({
          email: 'valideamil@dd.com',
          password: '',
        })
        .expect(400);
    });
  });
  describe('VALID PAYLOAD', () => {
    const email = 'admin@gmail.com';
    const password = 'admin';

    it('SHOULD return 200 if payload is valid', async () => {
      const result = await request(app.getHttpServer())
        .post(apiEndPont)
        .set('Accept', 'application/json')
        .send({
          email,
          password,
        })
        .expect(201);
      expect(result.body.id).toBeDefined();
      expect(result.body.token).toBeDefined();
    });

    it('SHOULD return 404 if user not found', async () => {
      await request(app.getHttpServer())
        .post(apiEndPont)
        .set('Accept', 'application/json')
        .send({
          email: 'helloemail@gmail.com',
          password,
        })
        .expect(404);
    });
    it('SHOULD return 400 if wrong password given', async () => {
      await request(app.getHttpServer())
        .post(apiEndPont)
        .set('Accept', 'application/json')
        .send({
          email,
          password: '12',
        })
        .expect(400);
    });
  });
});
