import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import * as session from 'express-session';
import * as passport from 'passport';
import config from './config';
import { RoomsModule } from './modules/rooms/rooms.module';

@Module({
  imports: [AuthModule, UsersModule, RoomsModule],
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
      .forRoutes('*')
      .apply(passport.initialize())
      .forRoutes('*')
      .apply(passport.session())
      .forRoutes('*');
  }
}
