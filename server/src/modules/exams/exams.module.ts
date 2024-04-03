import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { TestsModule } from '../tests/tests.module';
import { UniqueIdModule } from '../unique-id/unique-id.module';
import { RedisModule } from '../redis/redis.module';
import { ExamsController } from './exams.controller';

@Module({
  imports: [TestsModule, UniqueIdModule, RedisModule],
  providers: [ExamsService],
  controllers: [ExamsController],
  exports: [ExamsService],
})
export class ExamsModule {}
