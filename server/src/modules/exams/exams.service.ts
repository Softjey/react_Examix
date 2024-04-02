import { Inject, Injectable } from '@nestjs/common';
import { Test } from '@prisma/client';
import { TestsService } from '../tests/tests.service';
import { ExamQuestion } from './entities/exam-question.entity';
import { Exam } from './entities/exam.entity';
import { Student } from './entities/student.entity';
import { UniqueIdService } from '../unique-id/unique-id.service';
import { ExamEmitter } from './utils/exam.emitter';
import { Redis } from 'ioredis';

@Injectable()
export class ExamsService {
  private readonly redisPrefix = 'exam';

  constructor(
    @Inject('REDIS_CLIENT') private readonly redisService: Redis,
    private readonly testsService: TestsService,
    private readonly uniqueIdService: UniqueIdService,
  ) {}

  async save(id: string, exam: Exam) {
    await this.redisService.set(`${this.redisPrefix}:${id}`, JSON.stringify(exam));
  }

  async restore(id: string) {
    const exam = await this.redisService.get(`${this.redisPrefix}:${id}`);

    return exam ? JSON.parse(exam) : null;
  }

  async create(testId: Test['id']) {
    const [test, questions] = await this.testsService.getTestAndQuestionsByTestId(testId);
    const examsQuestions = questions.map((question) => new ExamQuestion(question));

    return new Exam(test, examsQuestions);
  }

  async createEmitter(testId: Test['id']) {
    const exam = await this.create(testId);

    return new ExamEmitter(exam);
  }

  async addStudent(exam: Exam, name: Student['name'], clientId: Student['clientId']) {
    const id = this.uniqueIdService.generateUUID();
    const newStudent = new Student(id, clientId, name);

    exam.students[newStudent.id] = newStudent;

    return newStudent;
  }
}
