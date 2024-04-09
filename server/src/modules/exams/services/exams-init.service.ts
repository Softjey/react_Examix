import { BadRequestException, Injectable } from '@nestjs/common';
import { TestsService } from 'src/modules/tests/tests.service';
import { UniqueIdService } from 'src/modules/unique-id/unique-id.service';
import { ExamsCacheService } from './exams-cache.service';
import { Test, User } from '@prisma/client';
import { Author } from '../entities/author.entity';
import { Exam } from '../entities/exam.entity';
import { ExamQuestion } from '../entities/exam-question.entity';

@Injectable()
export class ExamsInitService {
  constructor(
    private readonly testsService: TestsService,
    private readonly uniqueIdService: UniqueIdService,
    private readonly examsCacheService: ExamsCacheService,
  ) {}

  async createAndInit(userId: User['id'], testId: Test['id']) {
    const { exam, examCode, authorToken } = await this.create(userId, testId);
    await this.init(examCode, exam);

    return { exam, examCode, authorToken };
  }

  async init(examCode: string, exam: Exam) {
    await this.examsCacheService.setExam(examCode, exam);
  }

  async create(userId: User['id'], testId: Test['id']) {
    const [test, questions] = await this.testsService.getTestAndQuestionsByTestId(testId);
    const examsQuestions = questions.map((question) => new ExamQuestion(question));

    if (!test || !questions.length) {
      throw new BadRequestException(`Test with id ${testId} not found`);
    }

    const authorToken = this.uniqueIdService.generateUUID();
    const author = new Author(userId, authorToken);
    const examExits = (code) => this.examsCacheService.examExists(code);
    const examCode = await this.uniqueIdService.generate6DigitCode(examExits);
    const exam = new Exam(author, test, examsQuestions);

    return { exam, examCode, authorToken };
  }
}
