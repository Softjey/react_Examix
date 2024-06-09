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
import { Exam } from '../entities/exam.entity';
import { CurrentExamQuestion } from '../entities/current-exam-question.entity';

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

  getExam(examCode: string, nullable = false): Promise<Exam | null> {
    return this.examsCacheService.getExam(examCode).catch((exam) => {
      if (nullable) {
        return null;
      }

      throw exam;
    });
  }

  examExists(examCode: string) {
    return this.examsCacheService.examExists(examCode);
  }

  async joinAuthor(examCode: string, clientId: Author['clientId']) {
    const exam = await this.examsCacheService.getExam(examCode);
    exam.author.clientId = clientId;
    await this.examsCacheService.setExam(examCode, exam);
  }

  async joinNewStudent(
    examCode: string,
    studentName: Student['name'],
    clientId: Student['clientId'],
  ) {
    const exam = await this.examsCacheService.getExam(examCode);
    const studentId = this.uniqueIdService.generateUUID();
    const studentToken = this.uniqueIdService.generateUUID();
    const newStudent = new Student(clientId, studentName, studentToken);

    exam.students[studentId] = newStudent;

    await this.examsCacheService.setExam(examCode, exam);

    return [studentId, newStudent] as const;
  }

  async updateStudentClientId(
    examCode: string,
    studentId: Student['clientId'],
    newName: Student['name'],
    newClientId: Student['clientId'],
  ) {
    const exam = await this.examsCacheService.getExam(examCode);
    const changedId = exam.students[studentId].clientId;

    exam.students[studentId].clientId = newClientId;
    exam.students[studentId].name = newName;
    await this.examsCacheService.setExam(examCode, exam);

    const newStudent = exam.students[studentId];

    return [changedId, newStudent] as const;
  }

  async startExam(examCode: string) {
    const exam = await this.examsCacheService.getExam(examCode);
    exam.status = 'started';
    await this.examsCacheService.setExam(examCode, exam);

    this.processQuestion(examCode);
  }

  async kickStudent(examCode: string, studentId: string) {
    const exam = await this.examsCacheService.getExam(examCode);
    const studentClientId = exam.students[studentId]?.clientId;

    if (studentClientId !== undefined) {
      delete exam.students[studentId];
      await this.examsCacheService.setExam(examCode, exam);
    }

    return studentClientId ?? null;
  }

  async authorLeave(examCode: string) {
    const exam = await this.examsCacheService.getExam(examCode);
    const timeout = config.EXAM_AFTER_AUTHOR_LEAVE_TIMEOUT * 1000 * 60;

    if (exam.author.clientId) {
      exam.author.clientId = null;
    }

    if (exam.status === 'created') {
      setTimeout(async () => {
        const exam: Exam | null = await this.examsCacheService.getExam(examCode).catch(() => null);

        if (exam?.author?.clientId === null) {
          this.deleteExam(examCode);
        }
      }, timeout);
    }

    await this.examsCacheService.setExam(examCode, exam);
  }

  async studentLeave(examCode: string, clientId: string) {
    const exam = await this.examsCacheService.getExam(examCode);
    const { status, students } = exam;

    if (status !== 'created') {
      return;
    }

    const [studentId, student] = Object.entries(students).find(([, student]) => {
      return student.clientId === clientId;
    });

    delete exam.students[studentId];

    await this.examsCacheService.setExam(examCode, exam);

    return { studentId, ...student };
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

    const currentIndex = exam.currentQuestionIndex;
    const questionTimeLimit = exam.questions[currentIndex].timeLimit;
    const timeLimit = (questionTimeLimit + config.NETWORK_DELAY_BUFFER) * 1000;
    const currentQuestion = new CurrentExamQuestion(exam.questions[currentIndex], {
      index: currentIndex,
    });

    exam.currentQuestion = currentQuestion;
    this.emitQuestion(examCode, currentQuestion, exam.currentQuestionIndex);

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

  async deleteExam(examCode: string) {
    this.removeAllListeners(this.questionEventName(examCode));
    await this.examsCacheService.deleteExamFromCache(examCode);
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
