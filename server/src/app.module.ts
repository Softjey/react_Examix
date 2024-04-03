import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TestsModule } from './modules/tests/tests.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { SessionMiddleware } from './modules/auth/middlewares/session.middleware';
import { PassportMiddleware } from './modules/auth/middlewares/passport.middleware';
import { ExamsModule } from './modules/exams/exams.module';

@Module({
  imports: [AuthModule, UsersModule, ExamsModule, TestsModule, QuestionsModule],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes('*').apply(PassportMiddleware).forRoutes('*');
  }
}
