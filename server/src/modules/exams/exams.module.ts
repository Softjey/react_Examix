import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { TestsModule } from '../tests/tests.module';
import { UniqueIdModule } from '../unique-id/unique-id.module';
import { RedisModule } from '../redis/redis.module';
import { ExamsController } from './exams.controller';
import { ExamsGateway } from './exams.gateway';
import { ExamsResultsModule } from '../exams-results/exams-results.module';

@Module({
  imports: [TestsModule, UniqueIdModule, RedisModule, ExamsResultsModule],
  providers: [ExamsService, ExamsGateway],
  controllers: [ExamsController],
  exports: [ExamsService],
})
export class ExamsModule {}
