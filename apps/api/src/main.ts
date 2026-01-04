/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import SwaggerConfig from './configs/SwaggerConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const serviceName = configService.get('SERVICE_NAME');
  Logger.log(
    `${serviceName} is running on -> ${configService.get('HOST')}:${configService.get('PORT')}${configService.get(
      'SERVICE_API_PREFIX',
    )}`,
  );
  app.enableCors({
    origin: '*',
  });
  app.setGlobalPrefix(configService.get('SERVICE_API_PREFIX'));
  SwaggerConfig(app);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(configService.get('PORT'));
}
bootstrap();
