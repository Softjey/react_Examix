import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import * as session from 'express-session';
import config from './config';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: config.SESSION_SECRET,
          resave: false,
          saveUninitialized: false,
          rolling: true,
          cookie: {
            maxAge: 1000 * 60 * 60 * config.SESSION_MAX_AGE,
          },
        }),
      )
      .forRoutes('*');
  }
}
