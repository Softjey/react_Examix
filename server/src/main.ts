import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config';
import { enableApiDocs } from './utils/documentation';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './utils/exceptions/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalPipes(
    new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapter));
  app.enableCors({
    origin: config.CLIENT_URL,
    credentials: true,
  });
  enableApiDocs('api/docs', app);

  await app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  });
}
bootstrap();
