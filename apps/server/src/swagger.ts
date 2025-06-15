import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle(`my-auctions REST API`)
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  const documentEndpoint = `api`;
  Logger.debug(`Using documentation endpoint: ${documentEndpoint}`);

  SwaggerModule.setup(documentEndpoint, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  Logger.log(`🚀 Swagger API Documentation: http://localhost:3000/api`);
}
