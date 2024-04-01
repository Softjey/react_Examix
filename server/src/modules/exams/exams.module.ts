import { Module } from '@nestjs/common';
import { ExamsService } from './exams.service';
import { TestsModule } from '../tests/tests.module';
import { UniqueIdModule } from '../unique-id/unique-id.module';

@Module({
  imports: [TestsModule, UniqueIdModule],
  providers: [ExamsService],
  exports: [ExamsService],
})
export class ExamsModule {}
