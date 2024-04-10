import { Module } from '@nestjs/common';
import { ExamsModule } from '../exams/exams.module';
import { TestsModule } from '../tests/tests.module';
import { QuestionsModule } from '../questions/questions.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [ExamsModule, TestsModule, QuestionsModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
