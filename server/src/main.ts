import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config';
import { enableApiDocs } from './utils/documentation';
import { ValidationPipe } from '@nestjs/common';
import { ServerExceptionFilter } from './utils/exceptions/server-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ServerExceptionFilter(httpAdapter));
  app.enableCors();
  enableApiDocs('api/docs', app);

  await app.listen(config.PORT, () => {
    console.log(`Server is running on http://localhost:${config.PORT}`);
  });
}
bootstrap();
