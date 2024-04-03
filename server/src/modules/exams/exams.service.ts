import { Inject, Injectable } from '@nestjs/common';
import { Test, User } from '@prisma/client';
import { TestsService } from '../tests/tests.service';
import { ExamQuestion } from './entities/exam-question.entity';
import { Student } from './entities/student.entity';
import { UniqueIdService } from '../unique-id/unique-id.service';
import { Redis } from 'ioredis';
import { EventEmitter } from 'stream';
import { Author } from './entities/author.entity';
import { Exam } from './entities/exam.entity';
import config from 'src/config';
import { StudentAnswer } from './dtos/question-answer.dto';

@Injectable()
export class ExamsService extends EventEmitter {
  private readonly redisPrefix = 'exam';

  constructor(
    @Inject('REDIS_CLIENT') private readonly redisService: Redis,
    private readonly testsService: TestsService,
    private readonly uniqueIdService: UniqueIdService,
  ) {
    super();
  }

  private async setExam(examCode: string, exam: Exam) {
    await this.redisService.hset(this.redisPrefix, examCode, JSON.stringify(exam));
  }

  async getExam(examCode: string) {
    const exam = await this.redisService.hget(this.redisPrefix, examCode);

    return exam ? (JSON.parse(exam) as Exam) : null;
  }

  async examExists(examCode: string) {
    const fieldExists = await this.redisService.hexists(this.redisPrefix, examCode);

    return fieldExists === 1;
  }

  async create(userId: User['id'], testId: Test['id']) {
    const [test, questions] = await this.testsService.getTestAndQuestionsByTestId(testId);
    const examsQuestions = questions.map((question) => new ExamQuestion(question));

    const authorToken = this.uniqueIdService.generateUUID();
    const author = new Author(userId, authorToken);

    const examCode = await this.uniqueIdService.generate6DigitCode((code) => this.examExists(code));
    const exam = new Exam(author, test, examsQuestions);

    await this.setExam(examCode, exam);

    return { examCode, authorToken };
  }

  async joinAuthor(examCode: string, clientId: Author['clientId']) {
    const exam = await this.getExam(examCode);
    exam.author.clientId = clientId;
    await this.setExam(examCode, exam);
  }

  async joinStudent(examCode: string, studentName: Student['name'], clientId: Student['clientId']) {
    const exam = await this.getExam(examCode);
    const studentId = this.uniqueIdService.generateUUID();
    const newStudent = new Student(clientId, studentName);

    exam.students[studentId] = newStudent;

    await this.setExam(examCode, exam);

    return [studentId, newStudent] as const;
  }

  async startExam(examCode: string) {
    const exam = await this.getExam(examCode);
    exam.status = 'started';
    await this.setExam(examCode, exam);

    this.processQuestion(examCode);
  }

  private emitQuestion(examCode: string, question: ExamQuestion, questionIndex: number) {
    this.emit(`question-${examCode}`, question, questionIndex);
  }

  async onQuestion(
    examCode: string,
    callback: (question: ExamQuestion, questionIndex: number) => void,
  ) {
    this.on(`question-${examCode}`, callback);
  }

  private async processQuestion(examCode: string) {
    const exam = await this.getExam(examCode);
    const questionTimeLimit = exam.questions[exam.currentQuestionIndex].timeLimit;
    const timeLimit = (questionTimeLimit + config.NETWORK_DELAY_BUFFER) * 1000;

    exam.currentQuestionIndex += 1;

    if (exam.currentQuestionIndex >= exam.questions.length) {
      return this.endExam(examCode);
    }

    this.emitQuestion(
      examCode,
      exam.questions[exam.currentQuestionIndex],
      exam.currentQuestionIndex,
    );

    await this.setExam(examCode, exam);

    setTimeout(() => this.processQuestion(examCode), timeLimit);
  }

  async answerQuestion(examCode: string, studentId: Student['clientId'], answers: StudentAnswer[]) {
    const exam = await this.getExam(examCode);
    const questionId = exam.questions[exam.currentQuestionIndex].id;

    exam.students[studentId].results[questionId] = { answers };

    await this.setExam(examCode, exam);
  }

  async onExamFinish(examCode: string, callback: (exam: Exam) => void) {
    this.once(`finished-${examCode}`, callback);
  }

  async endExam(examCode: string) {
    const exam = await this.getExam(examCode);

    this.removeAllListeners(`question-${examCode}`);
    exam.status = 'finished';
    clearInterval(exam.intervalId);
    exam.intervalId = null;
    this.emit(`finished-${examCode}`, exam);
    await this.setExam(examCode, exam);
  }
}
