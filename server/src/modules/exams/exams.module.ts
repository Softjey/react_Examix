import { Module } from '@nestjs/common';
import { ExamsService } from './services/exams.service';
import { TestsModule } from '../tests/tests.module';
import { UniqueIdModule } from '../unique-id/unique-id.module';
import { RedisModule } from '../redis/redis.module';
import { ExamsController } from './exams.controller';
import { ExamsGateway } from './exams.gateway';
import { ExamsHistoryService } from './services/exams-history.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [RedisModule, PrismaModule, TestsModule, UniqueIdModule],
  providers: [ExamsService, ExamsHistoryService, ExamsGateway],
  controllers: [ExamsController],
  exports: [ExamsService],
})
export class ExamsModule {}
