import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config';
import { enableApiDocs } from './utils/documentation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  enableApiDocs('api/docs', app);

  await app.listen(config.PORT, () => {
    console.log(`Server is running on http://localhost:${config.PORT}`);
  });
}
bootstrap();
