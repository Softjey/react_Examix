import { Module } from '@nestjs/common';
import { ExamManagementService } from './services/exams-management.service';
import { TestsModule } from '../tests/tests.module';
import { UniqueIdModule } from '../unique-id/unique-id.module';
import { RedisModule } from '../redis/redis.module';
import { ExamsController } from './exams.controller';
import { ExamsGateway } from './exams.gateway';
import { ExamsHistoryService } from './services/exams-history.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ExamsCacheService } from './services/exams-cache.service';
import { ExamsInitService } from './services/exams-init.service';

@Module({
  imports: [RedisModule, PrismaModule, TestsModule, UniqueIdModule],
  providers: [
    ExamManagementService,
    ExamsHistoryService,
    ExamsCacheService,
    ExamsInitService,
    ExamsGateway,
  ],
  controllers: [ExamsController],
  exports: [ExamsHistoryService],
})
export class ExamsModule {}
