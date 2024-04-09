import { Injectable } from '@nestjs/common';
import { ExamQuestion } from '../entities/exam-question.entity';
import { Student } from '../entities/student.entity';
import { UniqueIdService } from '../../unique-id/unique-id.service';
import { EventEmitter } from 'stream';
import { Author } from '../entities/author.entity';
import config from 'src/config';
import { StudentAnswer } from '../dtos/question-answer.dto';
import { ExamsHistoryService } from './exams-history.service';
import { DetailedExam } from '../interfaces/detailed-exam.interface';
import { ExamsCacheService } from './exams-cache.service';

@Injectable()
export class ExamManagementService extends EventEmitter {
  private readonly questionEventName: (examCode: string) => string;
  private readonly examFinishedEventName: (examCode: string) => string;

  constructor(
    private readonly uniqueIdService: UniqueIdService,
    private readonly examsCacheService: ExamsCacheService,
    private readonly examsHistoryService: ExamsHistoryService,
  ) {
    super();
    this.questionEventName = (examCode: string) => `question-${examCode}`;
    this.examFinishedEventName = (examCode: string) => `finished-${examCode}`;
  }

  getExam = this.examsCacheService.getExam.bind(this.examsCacheService);
  examExists = this.examsCacheService.examExists.bind(this.examsCacheService);

  async joinAuthor(examCode: string, clientId: Author['clientId']) {
    const exam = await this.examsCacheService.getExam(examCode);
    exam.author.clientId = clientId;
    await this.examsCacheService.setExam(examCode, exam);
  }

  async joinStudent(examCode: string, studentName: Student['name'], clientId: Student['clientId']) {
    const exam = await this.examsCacheService.getExam(examCode);
    const studentId = this.uniqueIdService.generateUUID();
    const newStudent = new Student(clientId, studentName);

    exam.students[studentId] = newStudent;

    await this.examsCacheService.setExam(examCode, exam);

    return [studentId, newStudent] as const;
  }

  async startExam(examCode: string) {
    const exam = await this.examsCacheService.getExam(examCode);
    exam.status = 'started';
    await this.examsCacheService.setExam(examCode, exam);

    this.processQuestion(examCode);
  }

  private emitQuestion(examCode: string, question: ExamQuestion, questionIndex: number) {
    this.emit(this.questionEventName(examCode), question, questionIndex);
  }

  async onQuestion(
    examCode: string,
    callback: (question: ExamQuestion, questionIndex: number) => void,
  ) {
    this.on(this.questionEventName(examCode), callback);
  }

  private async processQuestion(examCode: string) {
    const exam = await this.examsCacheService.getExam(examCode);

    exam.currentQuestionIndex += 1;

    if (exam.currentQuestionIndex >= exam.questions.length) {
      return this.finishExam(examCode);
    }

    const questionTimeLimit = exam.questions[exam.currentQuestionIndex].timeLimit;
    const timeLimit = (questionTimeLimit + config.NETWORK_DELAY_BUFFER) * 1000;

    this.emitQuestion(
      examCode,
      exam.questions[exam.currentQuestionIndex],
      exam.currentQuestionIndex,
    );

    await this.examsCacheService.setExam(examCode, exam);

    setTimeout(() => this.processQuestion(examCode), timeLimit);
  }

  async answerQuestion(examCode: string, studentId: Student['clientId'], answers: StudentAnswer[]) {
    const exam = await this.examsCacheService.getExam(examCode);
    const questionId = exam.questions[exam.currentQuestionIndex].id;

    if (!exam.students[studentId]) {
      return false;
    }

    exam.students[studentId].results[questionId] = { answers };
    await this.examsCacheService.setExam(examCode, exam);

    return true;
  }

  async onExamFinish(examCode: string, callback: (results: Promise<DetailedExam>) => void) {
    this.once(this.examFinishedEventName(examCode), callback);
  }

  async getResults(examCode: string) {
    const exam = await this.examsCacheService.getExam(examCode);

    return this.examsHistoryService.parseResults(exam);
  }

  async finishExam(examCode: string) {
    const exam = await this.examsCacheService.getExam(examCode);

    this.removeAllListeners(this.questionEventName(examCode));
    exam.status = 'finished';

    const examPromise = this.examsHistoryService.saveExam(exam).then((exam) => {
      this.examsCacheService.deleteExamFromCache(examCode);

      return exam;
    });

    this.emit(this.examFinishedEventName(examCode), examPromise);
  }
}
