import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function enableApiDocs(path: string, app: INestApplication) {
  const docsConfig = new DocumentBuilder()
    .setTitle('Examix server API')
    .setDescription('This is the API documentation of the Examix server.')
    .build();

  const document = SwaggerModule.createDocument(app, docsConfig);
  SwaggerModule.setup(path, app, document);
}
