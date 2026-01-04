import { SignInUserDto } from '@/dto/SignInUserDto';
import { User } from '@/entities/User';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { expiresIn } from '@/common/Constant';

export async function configApp(app: INestApplication): Promise<void> {
  const configService = app.get(ConfigService);
  app.setGlobalPrefix(configService.get('SERVICE_API_PREFIX'));
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get('PORT'));
}

export async function getUserSignInResponse(email: string): Promise<SignInUserDto> {
  const user = await getRepository(User).findOne({
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
