import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export async function configApp(app: INestApplication): Promise<void> {
  const configService = app.get(ConfigService);
  app.setGlobalPrefix(configService.get('SERVICE_API_PREFIX'));
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get('PORT'));
}
