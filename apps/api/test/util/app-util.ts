import { SignInUserDto } from '@/dto/SignInUserDto';
import { User } from '@/entities/User';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import jwt from 'jsonwebtoken';
import { expiresIn } from '@/common/Constant';

let dataSource: DataSource | null = null;

export function getDataSource(): DataSource {
  if (!dataSource) {
    throw new Error('DataSource not initialized. Call configApp first.');
  }
  return dataSource;
}

export async function configApp(app: INestApplication): Promise<void> {
  const configService = app.get(ConfigService);
  app.setGlobalPrefix(configService.get('SERVICE_API_PREFIX'));
  app.useGlobalPipes(new ValidationPipe());
  dataSource = app.get(DataSource);
  await app.init();
}

export async function getUserSignInResponse(email: string): Promise<SignInUserDto> {
  if (!dataSource) {
    throw new Error('DataSource not initialized. Call configApp first.');
  }

  const userRepository = dataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { email },
  });

  if (!user) {
    throw new Error('User not found');
  }
  /* eslint-disable node/no-process-env */
  const secretKey = process.env.SECRET_KEY;

  const token = jwt.sign({ user }, secretKey, { expiresIn });
  return { ...user, token } as SignInUserDto;
}
