import { Injectable } from '@nestjs/common';
import { ExamsHistoryService } from './../exams/services/exams-history.service';
import { TestsService } from './../tests/tests.service';
import { QuestionsService } from '../questions/questions.service';

@Injectable()
export class SearchService {
  constructor(
    private readonly examsHistoryService: ExamsHistoryService,
    private readonly testsService: TestsService,
    private readonly questionsService: QuestionsService,
  ) {}

  async serachEverything({ search, limit }: { search: string; limit: number }) {
    const exams = await this.examsHistoryService.getAll({ search, limit, searchTest: false });
    const tests = await this.testsService.getAll({ search, limit });
    const questions = await this.questionsService.getAll({ search, limit });

    return { exams, tests, questions };
  }
}
