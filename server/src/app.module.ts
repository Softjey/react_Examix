import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HashModule } from './hash/hash.module';

@Module({
  imports: [AuthModule, UsersModule, HashModule],
  controllers: [AppController],
})
export class AppModule {}
