import { Module } from '@nestjs/common';
import { RoomsGateway } from './rooms.gateway';
import { RoomsService } from './rooms.service';
import { UniqueIdModule } from '../unique-id/unique-id.module';
import { RoomsController } from './rooms.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ExamsModule } from '../exams/exams.module';
import { AuthorsModule } from '../authors/authors.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [UniqueIdModule, PrismaModule, ExamsModule, AuthorsModule, RedisModule],
  providers: [RoomsGateway, RoomsService],
  controllers: [RoomsController],
})
export class RoomsModule {}
