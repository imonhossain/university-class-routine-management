import { INestApplication, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

const SwaggerConfig = (app: INestApplication): void => {
  const configService = app.get(ConfigService);
  const serviceName = configService.get('SERVICE_NAME');

  const config = new DocumentBuilder()
    .setTitle(serviceName)
    .setDescription(`${serviceName} API details.`)
    .setVersion(configService.get('SERVICE_VERSION'))
    .addBearerAuth(
      {
        description: `Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`rest/${serviceName}/swagger`, app, document);
  Logger.log(
    `Swagger is running on -> ${configService.get('HOST')}:${configService.get('PORT')}${configService.get(
      'SERVICE_API_PREFIX',
    )}/swagger`,
  );
};

export default SwaggerConfig;
